import 'next-auth';


declare module "next-auth" {

    interface User {
        username: string | null,
        userId: string,
        isVerified: boolean,
        profilePicSrc: string | null,
    }

    interface Session {
        username: string | null,
        userId: string,
        email: string,
        isVerified: boolean,
        profilePicSrc: string | null,
    }
}

declare module "next-auth/jwt" {

    interface JWT {
        username: string | null,
        userId: string,
        email: string,
        isVerified: boolean,
        profilePicSrc: string | null,
    }
}