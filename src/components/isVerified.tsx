'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function IsVerified() {

  const [isVisible, setIsVisible] = useState(false);
  const session = useSession();

  useEffect(() => {
    if(session.data) {
      
      if(session.data.user.isVerified) setIsVisible(false)
        else setIsVisible(true)
    }
  }, [session])
  

  return (

    <div className={`${isVisible ? "flex" : "hidden"} fixed top-16 z-50 items-center justify-center bg-[#384B70] p-3 w-full md:font-semibold space-x-4`}>
        <div className='text-white'>Verify yourself to post, comment, like.</div>
        <Link
        href={'/verify'}
        className='bg-backgroundSecond border-black p-0.5 px-2 border rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
        >Verify</Link>
    </div>
    
  )
}

export default IsVerified