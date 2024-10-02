import React from 'react';
import LoginBtn from '../LoginBtn';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import PostBtn from '../PostBtn';
import SearchBtn from './SearchBtn';
import LogoSvg from '@/lib/svgs/LogoSvg';

async function Navbar() {
  
  const session = await getServerSession(authOptions);

  return (
    <div className='fixed top-0 left-0 w-full h-14 flex items-center rounded-md justify-between px-5 bg-gray-950 z-50 text-white py-2'>

      <Link 
      href={'/'} 
      className='cursor-pointer'>
        <LogoSvg/>
      </Link>
      <div className='flex-grow md:hidden'></div>
      <SearchBtn/>

      <div>
        {!session? <LoginBtn/> : <div>
          <PostBtn session={session}/>
        </div>}
      </div>
    </div>
  )
}

export default Navbar