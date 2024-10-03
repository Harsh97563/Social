export const dynamic = 'force-dynamic';

import prisma from "@/utils/prismaSingleton";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);

    try {

        const url = new URL(req.url);
        const pageparam = Number(url.searchParams.get('pageParam'));
        const itemPerPage = 6;
        
        if(!pageparam || pageparam === 0) return NextResponse.json({
            msg: "Invalid parameters."
        }, {status: 400})
            
    
        const posts = await prisma.post.findMany({
            orderBy:{
                createdAt: 'desc',
            },
            include: {
                user: {
                    select: {
                        profilePicSrc: true,
                        username: true,
                    }
                },
                ...(session ? {
                    LikedBy: {
                    where: {
                        userId: session?.user.userId
                    },
                }
                } : {})
                
            },
            take: pageparam*itemPerPage,
            skip: (pageparam-1)*itemPerPage,
    
        }) 
        
        const totalPost = await prisma.post.count();
        const haveNextPage = pageparam*itemPerPage < totalPost;
        const nextPage = haveNextPage ? pageparam + 1 : null;
    
        return NextResponse.json({
            posts,
            nextPage
        }, {status: 200})
        
    } catch (error) {

        console.log("Error in fetching feeds.", error);
        return NextResponse.json({
            msg: "Error in fetching feeds."
        }, {status: 400})
    }

}