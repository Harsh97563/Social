import prisma from "@/utils/prismaSingleton";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";



export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);

    try {

        const data = await req.json()
        if(!data || !session) return NextResponse.json({
            msg: "Invalid Session/data."
        })

        switch (data.type) {
            case 0:
                await prisma.user.update({
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
                        username: data.data.toLowerCase()
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


export async function GET(req: NextRequest) {
    
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) return NextResponse.json({
                message: "Invalid Session."
        }, { status: 404 })


        const url = new URL(req.url);
        const username = url.searchParams.get('username');

        if(!username) return NextResponse.json({
            message: "No query found."
        }, { status: 400 })
        
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if(user) {
            return NextResponse.json({
                message: "User found successfully.",
                valid: false
            }, { status: 200 })
        }

        return NextResponse.json({
            message: "User not found.",
            valid: true
        }, { status: 200 })


    } catch (error) {
        console.error("Error in searching the user.", error);
        
        return NextResponse.json({
            message: "Error in searching the user.",
        }, { status: 400 })
    }
}

