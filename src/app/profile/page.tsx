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
    <div className=' min-w-[720px] h-screen pt-28'>
        <ProfileCard 
        profileData={profileData}
        />  
    </div>
  )
}

export default Profile