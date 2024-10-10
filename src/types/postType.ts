

export interface PostType {
    postId: string 
    caption: string | null, 
    files: string[] | [],
    likesCount: number,
    LikedBy: [] | undefined,  
    user: {
        profilePicSrc: string,
        username: string,
    },
    streak: {
        streakCount: number
    } 
}