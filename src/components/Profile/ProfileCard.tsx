'use client'
import { ProfileType } from '@/types/profileType';
import { UserPen } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
import EditingModel from './EditingModel';


function ProfileCard({profileData}: {profileData: ProfileType}) {  
    
  const [editFields, setEditFields] = useState(()=> {
    if(!profileData.username) return true
    else false
  });
  const [profilePicUrl, setProfilePicUrl] = useState(profileData.profilePicSrc);
  const [username, setUsername] = useState(profileData.username);
  const [email, setEmail] = useState(profileData.email);

  return (
    <div className='relative w-full flex mx-auto flex-col bg-gray-950 rounded-2xl px-12 py-4'>

      <div
      className='flex space-x-2 items-center cursor-pointer text-white bg-gray-500 rounded-2xl p-2 absolute right-3'
      onClick={() => setEditFields(!editFields)}
      > 
        <p>Edit</p>
        <UserPen size={20} />
      </div>

      <div className='w-full flex flex-col space-y-2 justify-center items-center'>

        <div className=''>
          <Image src={profilePicUrl || ""}
          loading='lazy' 
          alt='profile-pic' 
          width={200} 
          height={200} 
          className='rounded-3xl border-2 w-[200px] h-[200px] overflow-hidden border-[#00A8CC]'/>
        </div>
        <h2 className='text-white text-2xl'>{profileData.username}</h2>

      </div>

      <div className='w-full flex text-white justify-around mt-5'>
        <div className='text-center'>
          <h2 className='text-2xl'>Followers</h2>
          <p>0</p>
        </div>
        <div className='text-center'>
          <h2 className='text-2xl'>Following</h2>
          <p>0</p>
        </div>
      </div>
      
      <EditingModel
      // @ts-ignore 
      isEditing={editFields} 
      setIsEditing={setEditFields} 
      profileData={profileData}
      username={username}
      email={email}
      setEmail={setEmail}
      setUsername={setUsername}
      profilePicUrl={profilePicUrl}
      setProfilePicUrl={setProfilePicUrl}
      
      />
    </div>
  )
}

export default ProfileCard