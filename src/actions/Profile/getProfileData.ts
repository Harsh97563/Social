import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/utils/prismaSingleton";
import axios from "axios";
import { getServerSession } from "next-auth";


export async function getProfileData() {
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return
        }
        const data = await prisma.user.findUnique({
            where: {
                userId: session.userId
            },
            select: {
                username: true,
                email: true,
                profilePicSrc: true,
                isVerified: true,
            }
        })
        return data

    } catch (error) {
        console.error("Error in fetching profile data.", error);
        
    }
}