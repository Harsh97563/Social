import prisma from "@/utils/prismaSingleton";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { signIn } from "next-auth/react";



export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);

    try {

        const data = await req.json()
        if(!data || !session) return NextResponse.json({
            msg: "Invalid Session/data."
        })

        switch (data.type) {
            case 0:
                const res = await prisma.user.update({
                    where: {
                        userId: session.user.userId
                    },
                    data: {
                        profilePicSrc: data.data,
                    }
                })

                return NextResponse.json({
                    message: "Updated Profile Picture Successfully."
                }, {status: 200})
                
            case 1:
                await prisma.user.update({
                    where: {
                        userId: session.user.userId
                    },
                    data: {
                        username: data.data
                    }
                })
                
                return NextResponse.json({
                    message: "Updated Username Successfully."
                }, {status: 200})

        }
        
    } catch (error) {

        console.log("Error in updating profile data in db.", error);
        return NextResponse.json({
            message: "Error in updating DB."
        }, {status: 400})

    }
    
}

