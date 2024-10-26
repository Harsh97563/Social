import { updateType } from "@/components/Profile/EditingModel";
import axios from "axios";

export async function updateProfileData({data, type}: {data: string | FormData, type: updateType}) {
    
    try {
        let profileUrl;

        if(type === updateType.PROFILEPIC) {

            const cloudResponse = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`, data)
    
            if(cloudResponse.status != 200) {
                
                return {
                    success: false,
                    message: "Error while uploading profile picture."
                }
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                data: cloudResponse.data.secure_url,
                type
            })

            if(response.status != 200) {
                return {
                    success: false,
                    message: "Error in uploading profile picture.",
                }
            }

            profileUrl = cloudResponse.data.secure_url
    
    
        } else {
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                data,
                type
            })
            if(response.status != 200) {
                
                return {
                    success: false,
                    message: response.data.message
                }
            }
        }
    
    
        return {
            success: true,
            profileUrl,
            message: "Posted data sucessfully."
        }
        
    } catch (error) {
        
        console.log("Error while updating profile data.", error);

        return {
            success: false,
            message: "An error occured while updating profile."
        }
        
    }


}