import React from 'react'
import LoginBtn from '../LoginBtn'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import PostBtn from '../PostBtn'

async function Navbar() {
  
  const session = await getServerSession(authOptions);

  return (
    <div className='fixed top-0 left-0 w-full h-14 flex items-center rounded-md justify-between px-5 bg-gray-950 z-50 text-white py-2'>

      <Link 
      href={'/'} 
      className=' text-xl font-extrabold bg-gradient-to-r from-cyan-200 to-indigo-500 bg-clip-text text-transparent border-2 border-blue-500 p-1 tracking-wide cursor-pointer'>
        Strekial
      </Link>
      
      <div>
        {!session? <LoginBtn/> : <div>
          <PostBtn session={session}/>
        </div>}
      </div>
    </div>
  )
}

export default Navbar