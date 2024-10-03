

export interface PostType {
    userId: string,  
    postId: string 
    caption: string | null, 
    files: string[] | [],
    likesCount: number,
    LikedBy: [] | undefined,  
    user: {
        profilePicSrc: string,
        username: string,
    } 
}