import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import prisma from "@/utils/prismaSingleton";
import { StreakStatus } from "@prisma/client";
import redis from "@/lib/redis";
import { TwitterApi } from "twitter-api-v2";

enum StreakTypes {
    DAYS10 = 'DAYS10',
    DAYS30 = 'DAYS30',
    DAYS60 = 'DAYS60',
    DAYS100 = 'DAYS100',
}

function calculateEndDate(streakType: StreakTypes): Date {
    const currentDate = new Date();

    switch (streakType) {

        case StreakTypes.DAYS10:
            return new Date(currentDate.setDate(currentDate.getDate() + 10))
        
        case StreakTypes.DAYS30:
            return new Date(currentDate.setDate(currentDate.getDate() + 30))

        case StreakTypes.DAYS60:
            return new Date(currentDate.setDate(currentDate.getDate() + 60))

        case StreakTypes.DAYS100:
            return new Date(currentDate.setDate(currentDate.getDate() + 100))

    }

}

export async function POST(req: NextRequest) {
    let postStreakId: string | null = null;
    
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
    
        if(!session || !session.user) {
            return NextResponse.json({
                msg: "Invalid Session."
            }, {status: 403})
        }

        if(!session.user.isVerified) {
            return NextResponse.json({
                msg: "Verify yourself first."
            }, {status: 403})
        }
        
        if(!body.files.length && !body.caption) {
            return NextResponse.json({
                msg: "Either caption or image required."
            }, {status: 400})
        }
        
        if(body.streakType) {
            let isStreakValid: true | false  = true;
            let redisJson;
            const redisResponse = await redis.get(session.user.userId);

            if(redisResponse) {
                redisJson = JSON.parse(redisResponse)
            } else redisJson = null;
            
            if(redisResponse && redisJson.streakId) {

                const response = await prisma.streak.findUnique({
                    where: {
                        streakId: redisJson.streakId
                    }
                })
    
                if (response) {

                    const startTime = new Date().setHours(0, 0, 0, 0);
                    const endTime = new Date().setHours(23, 59, 59, 999);
                    const updatedAt = new Date(response.updatedAt);
                    updatedAt.setDate(updatedAt.getDate() + 1);
    
                    if(startTime <= updatedAt.getTime() && updatedAt.getTime() <=endTime ) {

                        const response = await prisma.streak.update({
                            where: {
                                streakId: redisJson.streakId
                            },
                            data: {
                                streakCount: {increment: 1}
                            }
                        })

                        await redis.set(session.user.userId, JSON.stringify({
                            streakId: response.streakId,
                            streakCount: response.streakCount,
                            updatedAt: response.updatedAt,
                            type: response.type,
                            seen: false
                        }));

                        postStreakId = response.streakId

                    } else {
                        const updatedAt = new Date(response.updatedAt);
                        const todayDate = new Date();
                        if(updatedAt.getDate() !== todayDate.getDate()) {
                            isStreakValid = false;
                        }
                    }

                } else isStreakValid = false;

            } else isStreakValid = false;

            if(!isStreakValid) {

                const response = await prisma.streak.create({
    
                    data: {
                        userId: session.user.userId,
                        type: body.streakType,
                        streakCount: 1,
                        endDate: calculateEndDate(body.streakType),
                        status: StreakStatus.ONGOING
                    }
                })


                await prisma.user.update({
                    where: {
                        userId: session.user.userId
                    },
                    data: {
                        activeSteakId: response.streakId
                    }
                })

                await redis.set(session.user.userId, JSON.stringify({
                    streakId: response.streakId,
                    streakCount: response.streakCount,
                    updatedAt: response.updatedAt,
                    type: response.type,
                    seen: false
                }));

                postStreakId = response.streakId;

            }


        }

        await prisma.post.create({
            data: {
                userId: session.user.userId,
                caption: body.caption,
                files: body.files,
                streakId: postStreakId
            }
        })

        if(body.postOnTwitter) {

            const user = await prisma.user.findUnique({
                where: {
                    userId: session.user.userId
                },
                select: {
                    twitterAccessToken: true,
                    twitterAccessSecret: true
                }
            })
            if(!user || !user.twitterAccessToken || !user.twitterAccessSecret) return NextResponse.json({
                message: "No linked twitter account found."
            })

            if(body.caption) {
                const client = new TwitterApi({
                    appKey: `${process.env.NEXT_PUBLIC_TWITTER_API_KEY}`,
                    appSecret: `${process.env.NEXT_PUBLIC_TWITTER_API_SECRET}`,
                    accessToken: user.twitterAccessToken,
                    accessSecret: user.twitterAccessSecret!
                })
                await client.v2.tweet(body.caption)
            }
            
        }
        
        return NextResponse.json({

            msg: "Post uploaded Successfully.",
            files: body.files,

        }, {status: 200})

    } catch (error) {
        
        console.log("Error in posting in db.", error);
        return NextResponse.json({
            msg: "Unexpected error occurs.",
            error: error
        }, {status: 400})
    }
    
}



export async function GET(req: NextRequest) {
    
    try {
        const url = new URL(req.url);
        const username = url.searchParams.get("username");

        const session = await getServerSession(authOptions);
        if (!username && !session?.user?.userId) {
            throw new Error('Both username and userId are missing');
        }

        const response = await prisma.user.findFirst({
            where: {
                ...(username ? {username} : { userId: session?.user.userId})
            },
            select: {
              posts: {
                select: {
                  postId: true,
                  caption: true,
                  files: true,
                  likesCount: true,
                  ...(session ? {
                    LikedBy: {
                        where: {
                            userId: session.user.userId
                        }
                    }
                  } : {}),
                  user: {
                    select: {
                      username: true,
                      profilePicSrc: true
                    }
                  }
                },
              }
            }
        });
        
        return NextResponse.json({
            message: "User posts fetched successfully.",
            posts: response
        }, { status: 200 })

    } catch (error) {
        console.error("Error while fetching the user posts.", error);
        return NextResponse.json({
            msg: "Error while fetching posts."
        }, { status: 400 })
        
    }
}