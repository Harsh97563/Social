export const dynamic = "force-dynamic";
import ProfileCard from '@/components/Profile/ProfileCard'
import React from 'react'
import { getProfileData } from '@/actions/Profile/getProfileData'

interface ProfileSearchParams {
  searchParams: {
    username? : string,
  }
}

async function Profile({searchParams}: ProfileSearchParams) {

  const profileData = await getProfileData({username: searchParams?.username});
  
  if(!profileData) {
    return <div>
      Error in fetching.
    </div>
  }

  if(!profileData.userData) {
    return <div className='flex w-screen h-screen items-center justify-center text-center text-3xl border'>
      No user found.
    </div>
  }

  return (
    <div className='md:w-[720px] mx-auto h-screen mt-3 p-2'>
        <ProfileCard 
        // @ts-expect-error Fix the type
        profileData={profileData}
        />  
    </div>
  )
}

export default Profile