'use client'
import { ProfileType } from '@/types/profileType';
import { UserPen } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
import EditingModel from './EditingModel';


function ProfileCard({profileData}: {profileData: ProfileType}) {  
    
  const [editFields, setEditFields] = useState(()=> {
    if(!profileData.userData.username) return true
    else false
  });
  const [profilePicUrl, setProfilePicUrl] = useState(profileData.userData.profilePicSrc);
  const [username, setUsername] = useState(profileData.userData.username);
  const [email, setEmail] = useState(profileData.userData.email);

  return (
    <div className='relative w-full flex md:mx-auto flex-col bg-[#384B70] rounded-sm px-2 md:px-12 py-4 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>

      <div
      className='flex space-x-2 items-center cursor-pointer px-4 bg-backgroundSecond rounded-sm border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 absolute right-3'
      onClick={() => setEditFields(!editFields)}
      > 
        <p>Edit</p>
        <UserPen size={20} />
      </div>

      <div className='w-full flex space-x-3 text-center'>
        <div>
          <div className='relative rounded-sm border-2 border-black w-[100px] md:w-[200px] h-[100px] md:h-[200px] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <Image src={profilePicUrl || ""}
            loading='lazy' 
            alt='profile-pic' 
            fill
            className=' object-cover'/>
          </div>
          <h2 className='text-white text-2xl'>{profileData.userData.username}</h2>
        </div>
        <div className='flex flex-col md:mb-8 w-full text-black p-2'>
          <div className='flex-grow'></div>
          <div className='flex md:h-[40%] h-[60%] w-full border-2 border-black bg-backgroundSecond p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <div className='flex w-[50%] border-r-2 border-black pl-1'>
              <div>
                <div className='md:text-xl'>Streak</div>
                <div className='relative w-8 h-8'>
                  <Image
                  src={"/Streak.gif"}
                  alt='streak'
                  fill
                  className='object-cover'
                  />
                </div>
              </div>
              <div className='flex w-full justify-center items-center text-xl md:text-2xl'>{profileData?.streakData?.streakCount ? `${profileData.streakData.streakCount} Days`  : "No active streak."}</div>
            </div>
            <div className='flex w-[50%] pl-1'>
              <div>
                <div className='md:text-xl'>Badges</div>
                <div className='relative w-7 h-8 ml-1'>
                  <Image
                  src={"/Badge.gif"}
                  alt='streak'
                  fill
                  className='object-cover'
                  />
                </div>
              </div>
              <div className='flex w-full justify-center items-center text-sm md:text-xl'>Coming soon!</div>
            </div>
          </div>
        </div>

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
      // @ts-expect-error same the type error
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