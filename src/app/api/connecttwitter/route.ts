export const dynamic = 'force-dynamic';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import prisma from "@/utils/prismaSingleton";
import { TwitterApi } from 'twitter-api-v2';
import redis from "@/lib/redis";


export async function PUT(req: NextRequest) {
    
    
    try {

        const session = await getServerSession(authOptions) 

        if(!session || !session.user) return NextResponse.json({
            message: "Invalid Session."
        }, { status: 404 })

        const { oauthAccessToken, oauthAccessVerifier } = await req.json()

        if (oauthAccessToken && oauthAccessVerifier) {

            const redisAccessSecret = await redis.get(oauthAccessToken)
            
            const client = new TwitterApi({
                appKey: process.env.NEXT_PUBLIC_TWITTER_API_KEY!,
                appSecret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET!,
                accessToken: oauthAccessToken,
                accessSecret: redisAccessSecret!,
            })

            const {accessToken, accessSecret} = await client.login(oauthAccessVerifier)

            await prisma.user.update({
                where: {
                    userId: session.user.userId
                },
                data: {
                    twitterAccessToken: accessToken,
                    twitterAccessSecret: accessSecret
                }
            })
            
        } else {
            const client = new TwitterApi({
                appKey: process.env.NEXT_PUBLIC_TWITTER_API_KEY!,
                appSecret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET!,
            })

            const { oauth_token, oauth_token_secret} = await client.generateAuthLink(`${process.env.NEXT_PUBLIC_REDIRECT_URL}/post`)

            await redis.set(oauth_token, oauth_token_secret, 'EX', 100)

            return NextResponse.json({
                message: "Retrived tokens successfully.",
                oauth_token
            }, { status: 200 })
            
        }

        return NextResponse.json({
            message: "Twitter connected successfully.",
        }, { status: 200 })

    } catch (error: any) {
        console.log("Error in connecting twitter.", error);
        
        return NextResponse.json({
            message: "Twitter connection failed."
        }, { status: 400 })
    }
}

export async function GET() {
    
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user) return NextResponse.json({
            message: "Invalid Session."
        }, { status: 404 })

        const response = await prisma.user.findUnique({
            where: {
                userId: session.user.userId
            }
        })

        return NextResponse.json({
            hasAccess: response?.twitterAccessToken ? true : false
        }, { status: 200 })

    } catch (error) {
        console.error("Error in checking twitter access.", error);

        return NextResponse.json({
            message: "Error in checking twitter access token."
        }, { status: 400 })
        
    }
}