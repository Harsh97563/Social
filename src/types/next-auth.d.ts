import 'next-auth';


declare module "next-auth" {

    interface User {
        username: string | null,
        userId: string,
        isVerified: boolean,
    }

    interface Session {
        username: string | null,
        userId: string,
        email: string,
        isVerified: boolean,
    }
}

declare module "next-auth/jwt" {

    interface JWT {
        username: string | null,
        userId: string,
        email: string,
        isVerified: boolean,
    }
}