import { StreakTypes } from "@prisma/client";
import axios from "axios";

interface PostData {
    files: File[],
    caption: string | null
    streakType: StreakTypes | null
}

export async function postData({files, caption, streakType}: PostData ) {


    try {
        const urls = await Promise.all(
            files.map(async(file) => {
                const formData = new FormData();
                formData.append("file",file);
                formData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLUDINARY_PRESET_POST_KEY}` );
    
                const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
                
                if(!cloudinaryUrl) {
                    throw new Error("Cloudinary Url not found.")
                }
    
                const responseData = await axios.post(cloudinaryUrl, formData);
                if(responseData.status != 200) {
                    throw new Error("File upload failed.")
                }

                return responseData.data.secure_url;
            })

        )

        const datatoSend = {
            files: urls,
            caption,
            streakType
        }
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, datatoSend)

        return {
            success: true,
            streakId: response.data.streakId
        }


    } catch (error: any) {
        console.log("Error posting data.", error);
        return {
            success: false,
        }
    }

}