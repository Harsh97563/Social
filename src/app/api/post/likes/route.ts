import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaSingleton";


export async function POST(req: NextRequest) {
    
    try {

        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return NextResponse.json({
                message: "Invalid Session."
            }, { status: 404})
        }

        if(!session.user.isVerified) {
            return NextResponse.json({
                message: "Verify yourself first."
            }, { status: 404})
        }

        const {postId, type} = await req.json();
        
        if(!postId) {
            return NextResponse.json({
                message: "Post Id required."
            }, { status: 400})
        }
        if(type == "LIKE") {
            
            await prisma.like.create({
                data: {
                    userId: session.user.userId,
                    postId
                }
            })
            
            await prisma.post.update({
                where: {
                    postId
                },
                data: {
                    likesCount: {increment: 1}
                }
            })

            return NextResponse.json({
                message: "Liked Successfully."
            }, { status: 200 })

        } else {
            await prisma.like.delete({
                where:{
                    postId_userId: {
                        postId,
                        userId: session.user.userId
                    }
                }
            })
            
            await prisma.post.update({
                where: {
                    postId
                },
                data: {
                    likesCount: {decrement: 1}
                }
            })

            return NextResponse.json({
                message: "Unliked Successfully."
            }, { status: 200 })
        }

    

    } catch (error: any) {
        console.error("Error liking/unliking post.", error);
        return NextResponse.json({
            message: "Unexpected error occured."
        }, { status: 500 })
        
    }
}