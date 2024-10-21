export const dynamic = 'force-dynamic';
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaSingleton";




export async function GET(req: NextRequest) {
    
    try {
        const url = new URL(req.url);
        const code = url.searchParams.get('code');
        
        const session = await getServerSession(authOptions);
        
        if(!session?.user.userId) return NextResponse.json({
            message: "Invalid session."
        }, { status: 404 })

        const response = await prisma.user.findUnique({
            where: {
                userId: session.user.userId
            }
        })
        
        if(response?.verificationCode != code) return NextResponse.json({
            message: "Invalid Verification code."
        }, { status: 400 })

        await prisma.user.update({
            where: {
                userId: session.user.userId
            },
            data: {
                isVerified: true
            }
        })

        return NextResponse.json({
            message: "Verification complete."
        }, { status: 200 })


    } catch (error) {
        console.error("Error in verifying user.", error);
        
        return NextResponse.json({
            message: "Error in verifying user."
        }, { status: 400 })
    }
}