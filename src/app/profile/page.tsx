import ProfileCard from '@/components/Profile/ProfileCard'
import React from 'react'
import { getProfileData } from '@/actions/Profile/getProfileData'

async function Profile() {

  const profileData = await getProfileData();

  if(!profileData) {
    return <div>
      Hello
    </div>
  }
  
  return (
    <div className='w-[720px] mx-auto h-screen mt-5'>
        <ProfileCard 
        profileData={profileData}
        />  
    </div>
  )
}

export default Profile