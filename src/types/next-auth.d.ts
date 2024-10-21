import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module "next-auth" {

    interface User {
        username: string | null,
        userId: string,
        isVerified: boolean,
        profilePicSrc: string | null,
        streakId: string | null,
    }

    interface Session { 
    user: {
      username: string | null;
      userId: string;
      email: string;
      isVerified: boolean;
      profilePicSrc: string | null;
      streakId: string | null
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {

    interface JWT {
        username: string | null,
        userId: string,
        email: string,
        isVerified: boolean,
        profilePicSrc: string | null,
        streakId: string | null,
    }
}