import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import prisma from "@/utils/prismaSingleton";



export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
    
        if(!session) {
            return NextResponse.json({
                msg: "Invalid Session."
            }, {status: 400})
        }
        
        if(!body.files.length && !body.caption) {
            return NextResponse.json({
                msg: "Either caption or image/video required."
            }, {status: 400})
        }

        await prisma.post.create({
            data: {
                userId: session.userId,
                caption: body.caption,
                files: body.files,
            }
        })
        
        return NextResponse.json({
            msg: "Post uploaded Successfully.",
            files: body.files
        }, {status: 200})

    } catch (error) {
        
        console.log("Error in posting in db.",error);
        return NextResponse.json({
            msg: "Unexpected error occurs.",
            error: error
        }, {status: 400})
    }
    
}