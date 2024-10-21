export const dynamic = 'force-dynamic';
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
        const startTime = new Date().setHours(0, 0, 0, 0);
        const endTime = new Date().setHours(23, 59, 59, 999);
        const updatedAt = new Date(redisJson.updatedAt);
        const todayDate = new Date();
        const sameDay = updatedAt.getDate() !== todayDate.getDate()
        updatedAt.setDate(updatedAt.getDate() + 1);

        if(!(startTime <= updatedAt.getTime() && updatedAt.getTime() <= endTime) && sameDay ) {

            await redis.set(session.user.userId, JSON.stringify({
                ...redisJson,
                seen: true
            }))
            
        }


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