import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
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

        const {postId, comment} = await req.json();

        if (!postId || !comment) return NextResponse.json({
            message: "All field required."
        }, { status: 400 })

        await prisma.comment.create({
            data: {
                comment,
                postId,
                userId: session.user.userId
            }
        })

        return NextResponse.json({
            message: "Posted comment successfully."
        }, {status: 200})
        
    } catch (error) {

        console.error("Error while posting comment.", error);
        return NextResponse.json({
            message: "Error while posting comment."
        }, { status: 400 })
        
    }
}

export async function GET(req: NextRequest) {
    
    const url = new URL(req.url);
    const postId = url.searchParams.get('postId');

    if(!postId) {
        return NextResponse.json({
            message: "Post Id not found."
        }, { status: 400 })
    }

    try {
        
        const comments = await prisma.post.findUnique({
            where: {
                postId
            },
            select: {
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                profilePicSrc: true
                            }

                        }
                    }
                }
            }
        })

        return NextResponse.json({
            message: "Fetched comment successfully.",
            comments
        }, { status: 200 })

    } catch (error) {

        console.log('Error while fetching comments.', error);
        NextResponse.json({
            message: "Error while fetching the comments."
        }, {status: 400})

    }
}