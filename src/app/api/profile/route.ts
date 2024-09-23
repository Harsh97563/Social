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
                const res = await prisma.user.update({
                    where: {
                        userId: session?.userId
                    },
                    data: {
                        profilePicSrc: data.resData.secure_url,
                    }
                })

                return NextResponse.json({
                    msg: "Updated Profile Picture Successfully."
                }, {status: 200})
                
            case 1:
                const res1 = await prisma.user.update({
                    where: {
                        userId: session.userId
                    },
                    data: {
                        username: data.data
                    }
                })

                return NextResponse.json({
                    msg: "Updated Username Successfully."
                }, {status: 200})

        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: "Error in updating DB."}, {status: 400})
    }
    
}

