import axios from "axios";

export async function postData({files, caption}: {files: File[], caption: string | null}) {

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
            caption
        }
        
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, datatoSend)


    } catch (error: any) {
        console.log("Error posting data.", error);
        return {
            success: false,
        }
    }

}