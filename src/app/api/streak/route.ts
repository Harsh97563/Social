import redis from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";



export async function GET() {
    
    try {
        const session = await getServerSession(authOptions);

        if(!session) {
            return NextResponse.json({
                msg: "Invalid session."
            }, { status: 404 })
        }
        
        const redisResponse = await redis.get(session.user.userId)

        if(!redisResponse) return NextResponse.json({
            message: "No streak data found.",
            streakData: redisResponse
        }, { status: 200 })

        const redisJson = JSON.parse(redisResponse)
        await redis.set(session.user.userId, JSON.stringify({
            ...redisJson,
            seen: true
        }))

        return NextResponse.json({
            message: "Streak data found.",
            streakData: redisJson
        }, { status: 200 })
        
    } catch (error) {
        console.error("Error while fetching streak data.", error);

        return NextResponse.json({
            msg: "Not able to get user streakdata."
        }, { status: 400 })
        
    }
}