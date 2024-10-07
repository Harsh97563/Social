import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import prisma from "@/utils/prismaSingleton";

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
    
        if(!session) {
            return NextResponse.json({
                msg: "Invalid Session."
            }, {status: 403})
        }
        
        if(!body.files.length && !body.caption) {
            return NextResponse.json({
                msg: "Either caption or image required."
            }, {status: 400})
        }
        
        if(body.streakType) {
            let isStreakValid: true | false  = true;
            
            if(session.user.streakId) {

                const response = await prisma.streak.findUnique({
                    where: {
                        streakId: session.user.streakId
                    }
                })
    
                if (response) {

                    const startTime = new Date().setHours(0, 0, 0, 0);
                    const endTime = new Date().setHours(23, 59, 59, 999);
                    const updatedAt = new Date(response.updatedAt);
                    updatedAt.setDate(updatedAt.getDate() + 1);
    
                    if(startTime <= updatedAt.getTime() && updatedAt.getTime() <=endTime ) {

                        await prisma.streak.update({
                            where: {
                                streakId: session.user.streakId
                            },
                            data: {
                                streakCount: {increment: 1}
                            }
                        })

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
                        endDate: calculateEndDate(body.streakType)
                    }
                })
    
                if(response) {
                    postStreakId = response.streakId
                }

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
        
        return NextResponse.json({

            msg: "Post uploaded Successfully.",
            files: body.files,
            streakId: postStreakId

        }, {status: 200})

    } catch (error) {
        
        console.log("Error in posting in db.",error);
        return NextResponse.json({
            msg: "Unexpected error occurs.",
            error: error
        }, {status: 400})
    }
    
}