import { updateType } from "@/components/Profile/ProfileCard";
import axios from "axios";

export async function updateProfileData({data, type}: {data: any, type: updateType}) {

    try {
        switch (type) {
            case updateType.PROFILEPIC:

                const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;

                if(!cloudinaryUrl) {
                    throw new Error("Cloudinary Url not found.")
                }

                const responseData = await axios.post(cloudinaryUrl, data);
                
                const body = JSON.stringify({
                    resData: responseData.data,
                    type: updateType.PROFILEPIC
                })

                const dbResponse = await axios.post('/api/profile', body)
                return {
                    url: responseData.data.secure_url,
                }
                break;

            case updateType.USERNAME:

                await axios.post('/api/profile', {
                    data,
                    type
                })
                break;
            default:
                break;
        }
    } catch (error) {
        return error
    }
}