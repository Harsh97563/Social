'use client'
import { ProfileType } from '@/types/profileType';
import { UserPen } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
import EditingModel from './EditingModel';
import { useSession } from 'next-auth/react';


function ProfileCard({profileData}: {profileData: ProfileType}) {  
    
  const [editFields, setEditFields] = useState(()=> {
    if(!profileData.userData.username) return true
    else false
  });
  const [profilePicUrl, setProfilePicUrl] = useState(profileData.userData.profilePicSrc);
  const [username, setUsername] = useState(profileData.userData.username);
  const [email, setEmail] = useState(profileData.userData.email);
  const session = useSession();


  return (
    <div className='relative w-full flex md:mx-auto flex-col bg-[#384B70] rounded-sm px-2 md:px-12 py-4 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
      {session.data?.user.username === profileData.userData.username ?
        <div
        className='flex space-x-2 items-center cursor-pointer px-4 bg-backgroundSecond rounded-sm border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 absolute right-3'
        onClick={() => setEditFields(!editFields)}
        > 
          <p>Edit</p>
          <UserPen size={20} />
        </div> : <></>
      
    }

      <div className='w-full flex space-x-3 text-center'>
        <div>
          <div className='relative rounded-sm mb-1 border-2 border-black w-[100px] md:w-[200px] h-[100px] md:h-[200px] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
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
          <div className='flex md:h-[42%] h-[60%] w-full border-2 border-black bg-backgroundSecond p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <div className='flex flex-col w-[50%] border-r-2 border-black px-1'>
              <div className='text-sm md:text-xl border-b border-black '>Streak</div>
              <div className='flex mt-1'>
                <div className='relative w-8 h-8'>
                  <Image
                  src={"/Streak.gif"}
                  alt='streak'
                  fill
                  className='object-cover'
                  />
                </div>
                <div className='flex w-full justify-center items-center text-xs md:text-lg'>{profileData?.streakData?.streakCount ? `${profileData.streakData.streakCount} Days`  : "No active streak."}</div>
              </div>
            </div>
            <div className='flex flex-col w-[50%] pl-1 pr-2'>
              <div className='text-sm md:text-xl border-b border-black'>Badges</div>
              <div className='flex mt-1'>
                <div className='relative w-10 h-8 md:h-9 ml-1'>
                  <Image
                  src={"/Badge.gif"}
                  alt='streak'
                  fill
                  className='object-cover'
                  />
                </div>
                <div className='flex w-full justify-center items-center text-xs md:text-xl pr-1'>Coming soon!</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* <div className='w-full flex text-white justify-around mt-5'>
        <div className='text-center'>
          <h2 className='text-2xl'>Followers</h2>
          <p>0</p>
        </div>
        <div className='text-center'>
          <h2 className='text-2xl'>Following</h2>
          <p>0</p>
        </div>
      </div> */}
      
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