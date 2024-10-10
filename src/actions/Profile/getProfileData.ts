import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/utils/prismaSingleton";
import { getServerSession } from "next-auth";

interface GetProfileData {
    username: string | undefined
}

export async function getProfileData({username}: GetProfileData) {
    
    let streakData = null;
    try {
        
        const session = await getServerSession(authOptions);

        if(!session) {
            return
        }
        const userData = await prisma.user.findUnique({
            where: {
                ...(username ? {username: username} : { userId: session.user.userId })  
            },
            select: {
                username: true,
                ...(!username ? {email: true} : {}),
                profilePicSrc: true,
                isVerified: true,
                activeSteakId: true
            }
        })

        if(userData?.activeSteakId) {

            streakData = await prisma.streak.findUnique({
                where: {
                    streakId: userData.activeSteakId
                }, 
                select: {
                    streakCount: true,
                    type: true
                }
            })

        }
        
        return {userData, streakData}

    } catch (error) {
        console.error("Error in fetching profile data.", error);
        
    }
}