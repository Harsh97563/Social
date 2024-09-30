'use client'
import { updateProfileData } from '@/actions/Profile/updateProfileData';
import { useToast } from '@/hooks/use-toast';
import { ProfileType } from '@/types/profileType'
import { Loader2, Pencil, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useRef, useState } from 'react'

interface EditingModelType  {
    profileData: ProfileType, 
    isEditing: boolean, 
    setIsEditing: any
    username: string | null
    email: string
    setUsername: any
    setEmail:any
    profilePicUrl: string | null,
    setProfilePicUrl: any
}

export enum updateType {
    PROFILEPIC,
    USERNAME,
    BIO,
    EMAIL
}

function EditingModel({profileData, isEditing, setIsEditing, username, setUsername, email, setEmail, profilePicUrl, setProfilePicUrl}: EditingModelType ) {

    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {toast} = useToast();
    const { update } = useSession();

    async function handleUpdate({type, e}: {type: null | updateType, e: any | null}) {
        if(!username) {
            throw new Error("Username can't be empty.")
        }
        try {
            setIsUploading(true);
            
            if(username !== profileData.username) {
                
                const response = await updateProfileData({data: username, type: updateType.USERNAME })

                if(!response.success) {
                    throw new Error(response.message)
                }
                setUsername(username)
                await update({username})
                
            }

            if( email !== profileData.email) {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                const emailValidation = emailRegex.test(email);
                if(!emailValidation) {
                    throw new Error("Invalid Email.")
                }
                const response = await updateProfileData({data: email, type: updateType.EMAIL})
                if(!response.success) {
                    throw new Error(response.message)
                }

                setEmail(email)
            }

            if(type === updateType.PROFILEPIC) {

                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLUDINARY_PRESET_PROFILE_KEY}`)

                const response = await updateProfileData({data: formData, type})
                if(!response.success) {
                    throw new Error(response.message)
                }

                if(response.profileUrl) setProfilePicUrl(response.profileUrl)

            }

            toast({
                title: "Profile updated successfully.",
                duration: 2000,
            })

        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message || "Unexpected error occured.",
                duration: 2000,
                className: "border-2 border-red-900 text-white bg-gray-500"
            })

        } finally {
            setIsUploading(false)
        }
    }
  return (

    <div className={`fixed w-full h-full p-2 transition-all duration-75 ${isEditing ? "top-0 visible bg-opacity-90" : "top-10 invisible bg-opacity-0"} transition-all left-0 bg-black z-50`}>
        <X size={40} className={`absolute text-white border-black ${isEditing? "right-10" : "-right-10"} duration-150 delay-150 top-5 z-50 bg-gray-500 rounded-lg p-1`}
        onClick={() => setIsEditing(false)}
        />
        <div className={`mx-auto flex flex-col border-gray-500 bg-gray-950 text-white rounded-3xl border md:max-w-[720px] p-4 mt-[50%] md:mt-16`}>
            <div className='relative group mx-auto rounded-3xl mb-5'
            onClick={() => inputRef.current?.click()}
            >
                <Image src={profilePicUrl || ""}
                loading='lazy' 
                alt='profile-pic' 
                width={200} 
                height={200} 
                className='rounded-3xl w-[200px] h-[200px] overflow-hidden border-2 mx-auto border-[#00A8CC]'/>
                <div className='absolute invisible group-hover:visible flex items-center justify-center top-0 left-0 mx-auto w-[200px] h-[200px] bg-black inset-0 bg-opacity-90 rounded-3xl'>
                    <Pencil size={30}/>
                </div>
                <input 
                ref={inputRef}
                type="file"
                className='invisible'
                accept='.png, .jpeg, .jpg'
                onChange={(e) => {
                    handleUpdate({type: updateType.PROFILEPIC, e: e})
                }}
                disabled={isUploading}
                />
            </div>
            <div className='flex px-5 justify-between space-x-3'>
                <div className='w-full'>
                    <p className='text-xl'>Username</p>
                    <input type="text"
                    className='w-full bg-gray-500 p-2 rounded-lg outline-none'
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isUploading}
                    />
                </div>
                <div className=' w-full'>
                    <p className='text-xl'>Email</p>
                    <input type="text"
                    className='w-full bg-gray-500 p-2 rounded-lg outline-none'
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isUploading}
                    />
                </div>
            </div>
            <button className='flex justify-center disabled:cursor-not-allowed w-full bg-gray-500 rounded-xl p-2 mt-4'
            onClick={() => handleUpdate({type:null, e: null})}
            disabled={isUploading}
            >{isUploading ? <Loader2 size={25} className=' animate-spin'/> : "Update details!"}
            </button>
        </div>
    </div>
  )
}

export default EditingModel