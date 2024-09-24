

export interface PostType {
    userId: string,  
    postId: string 
    caption: string | null, 
    files: string[] | []  
    user: {
        profilePicSrc: string,
        username: string,
    } 
}