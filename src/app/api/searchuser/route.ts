export const dynamic = "force-dynamic";
import prisma from "@/utils/prismaSingleton";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    try {
        const url = new URL(req.url);
        const query = url.searchParams.get('query');

        if(!query) return

        const users = await prisma.user.findMany({
            where: {
                username: {contains: query, mode: "insensitive"}
            },
            select: {
                username: true,
                profilePicSrc: true,
            }
        })

        return NextResponse.json({
            message: "Fetched user's successfully.",
            users
        }, {status: 200})
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: "Failed to search user.",
        }, {status: 400})
    }
}