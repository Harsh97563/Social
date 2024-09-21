import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'; 
import prisma from "@/utils/prismaSingleton";



export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({

            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            // @ts-ignore
            async authorize(credentials) {

                if(!credentials?.email || !credentials?.password) {
                    return null;
                };

                try {
                    
                    const userDb = await prisma.user.findFirst({
                        where: {
                            email: credentials.email
                        },
                        select: {
                            username: true,
                            userId: true,
                            email: true,
                            password: true,
                            isVerified: true,
                            profilePicSrc: true
                        }
                    })
                    

                    if(userDb && userDb.password) {

                        const passwordCheck = await bcrypt.compare(credentials.password, userDb.password)

                        if(!passwordCheck) return null;

                        return {
                            id: userDb.userId,
                            username: userDb.username,
                            userId: userDb.userId,
                            email: userDb.email,
                            isVerified: userDb.isVerified,
                            profilePicSrc: userDb.profilePicSrc,
                        }
                    }


                    const hashedPassword = await bcrypt.hash(credentials.password, 10)

                    const user = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword,
                            profilePicSrc: "https://res.cloudinary.com/dc8yqhawq/image/upload/v1726839243/sokwk28elnyvhtwxm4hq.jpg"
                        },
                        select: {
                            email: true,
                            userId: true,
                            isVerified: true,
                            profilePicSrc: true,
                        }

                    })

                    return {

                        id: user.userId,
                        email: user.email,
                        userId: user.userId,
                        isVerified: user.isVerified,
                        profilePicSrc: user.profilePicSrc
                    }


                } catch (error) {
                    console.log("error during user authorization:", error);
                }

                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",

        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({account, profile, user}) {
            
            if(account?.provider === 'google') {

                if(!profile) return false;

                try {
                    const userDb = await prisma.user.findFirst({
                        where: {
                            email: profile.email
                        },
                        select: {
                            username: true,
                            userId: true,
                            email: true,
                            isVerified: true,
                            profilePicSrc: true,
                        }
                    })
    
                    if(userDb) {
    
                        user.username = userDb.username;
                        user.userId = userDb.userId;
                        user.isVerified = userDb.isVerified;
                        user.profilePicSrc = userDb.profilePicSrc
    
                    }
    
                    if(!userDb && profile.email) {
    
                        const createdUser = await prisma.user.create({
                            data: {
                                email: profile.email,
                                isVerified: true,
                                profilePicSrc: "https://res.cloudinary.com/dc8yqhawq/image/upload/v1726839243/sokwk28elnyvhtwxm4hq.jpg"
                            },
                            select: {
                                username: true,
                                userId: true,
                                email: true,
                                isVerified: true,
                                profilePicSrc: true,
                            }
                        })
    
                        if(user) {
    
                            user.username = createdUser.username;
                            user.userId = createdUser.userId;
                            user.isVerified = createdUser.isVerified;
                            user.profilePicSrc = createdUser.profilePicSrc;
                        }
    
                    }
                } catch (error) {
                    console.log("Error in google auth.", error);
                    return false;
                }
            }

            
            return true;
        },

        async jwt({token, user}) {

            if(user && user.email) {
                
                token.username = user.username;
                token.userId = user.userId;
                token.email = user.email;
                token.isVerified = user.isVerified;
                token.profilePicSrc = user.profilePicSrc;
            }
            return token
        },

        async session({session, token}) {

            session.username = token.username;
            session.userId = token.userId;
            session.email = token.email;
            session.isVerified = token.isVerified;
            session.profilePicSrc = token.profilePicSrc;

            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/sign-in',
    }
}