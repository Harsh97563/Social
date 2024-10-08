

export interface ProfileType {
    userData: {
        username: string | null,
        email: string,
        profilePicSrc: string | null,
        isVerified: boolean,
    },
    streakData: {
        streakCount: number | null,
        type: string
    }
}