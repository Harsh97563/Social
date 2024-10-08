import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/utils/prismaSingleton";
import { getServerSession } from "next-auth";


export async function getProfileData() {
    let streakData = null;
    try {
        
        const session = await getServerSession(authOptions);

        if(!session) {
            return
        }
        const userData = await prisma.user.findUnique({
            where: {
                userId: session.user.userId
            },
            select: {
                username: true,
                email: true,
                profilePicSrc: true,
                isVerified: true,
                activeSteakId: true
            }
        })
        if(session.user.streakId) {

            streakData = await prisma.streak.findUnique({
                where: {
                    streakId: session.user.streakId
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