'use client'
import { updateProfileData } from '@/actions/Profile/updateProfileData';
import { ProfileType } from '@/types/profileType';
import { LoaderCircle, Pencil, UserPen } from 'lucide-react'
import Image from 'next/image';
import React, { useRef, useState } from 'react'

export enum updateType {
  PROFILEPIC,
  USERNAME,
  BIO,
  EMAIL
}

function ProfileCard({profileData}: {profileData: ProfileType}) {  
    
  const fileInputRef = useRef<HTMLInputElement | undefined>();
  const [username, setUsername] = useState(profileData.username || "");
  // const [email, setEmail] = useState(profileData.email);
  const [editFields, setEditFields] = useState(()=> {
    if(!profileData.username) return true
    else false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(profileData.profilePicSrc)
  const usernameRef = useRef<HTMLInputElement | null>(null);

  async function handleUpdate({e, type}: {e: React.ChangeEvent<HTMLInputElement> | null , type: updateType}) {
    
    try {
      setIsUploading(true);
      switch (type) {
        case updateType.PROFILEPIC:
          if(!e) return 
          const file = e.target.files?.[0];
          
          if(!file) return

          const formData = new FormData()
          formData.append('file', file);
          formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLUDINARY_PRESET_PROFILE_KEY}`)

          const res:any = await updateProfileData({data: formData, type})
          console.log("here", res);
          setProfilePicUrl(res.url)
          
          break;
        case updateType.USERNAME:

          if(username == "") return
          await updateProfileData({data: username, type})

          break;
        
        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      
    } finally {
      setIsUploading(false)
    }
      
  }


  return (
    <div className='relative w-full flex mx-auto border border-[#00A8CC] flex-col bg-[#0F4C75] rounded-2xl px-12 py-4 drop-shadow-2xl shadow-2xl shadow-black'>
      <div
      className='flex space-x-2 items-center cursor-pointer text-white bg-gray-950 rounded-2xl p-2 absolute right-3'
      onClick={() => setEditFields(!editFields)}
      > 
        <p>Edit</p>
        <UserPen size={20} />
      </div>
        <div className='w-full flex justify-between items-center'>
          <div className='relative'>

            <Image src={profilePicUrl || ""} 
            alt='profile-pic' 
            width={200} 
            height={200} 
            className='rounded-3xl border-2 border-purple-600'/>

            <button className={`absolute group flex items-center justify-center ${isUploading ? 'bg-black' : ""} hover:bg-black opacity-90 top-0 left-0 rounded-3xl w-[200px] h-[200px]`}
            onClick={() => {
              fileInputRef.current?.click()
            }}
            >
              {isUploading ? 
              <LoaderCircle size={50} className='text-white animate-spin'/> :
              <Pencil className='text-white invisible group-hover:visible'/>}
            </button>

            <input
          //   @ts-ignore
            ref={fileInputRef} 
            type="file"
            accept='.jpg, .jpeg, .png'
            className='invisible'
            onChange={(e) => handleUpdate({e:e, type: updateType.PROFILEPIC})}
            disabled={isUploading} 
            />
          </div>
          <div className='flex flex-col'>
            <div
            className={`${profileData.username? "invisible" : "visible"} text-xl text-white`}
            >Please pick a username to continue.</div>
            <input
            ref={usernameRef} 
            value={username} 
            type="text" 
            placeholder='Click here to enter username'
            className={`outline-none text-xl p-2 text-white ${editFields ? "bg-gray-950 rounded-2xl" : "bg-transparent"}`}
            disabled={!editFields}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                handleUpdate({e:null ,type: updateType.USERNAME})
              }
            }}
            />
            {/* <input 
            value={email} 
            type="text" 
            className={`${!editFields ? "invisible" : "visible"} bg-transparent outline-none`}
            disabled={!editFields}
            /> */}
          </div>
        </div>
        {/* <div className='w-full flex justify-around mt-5'>
          <div>
            <h2 className='text-2xl'>Followers</h2>
          </div>
          <div>
            <h2 className='text-2xl'>Following</h2>
          </div>
        </div> */}
      </div>
  )
}

export default ProfileCard