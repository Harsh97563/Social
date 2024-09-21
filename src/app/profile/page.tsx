import ProfileCard from '@/components/Profile/ProfileCard'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

async function page() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className=' min-w-[720px] h-screen pt-28'>
        <ProfileCard 
        session={session}
        />  
    </div>
  )
}

export default page