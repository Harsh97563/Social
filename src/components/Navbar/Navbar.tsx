import React from 'react';
import LoginBtn from '../LoginBtn';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import PostBtn from '../PostBtn';
import SearchBtn from './SearchBtn';
import Logo from './Logo';
import * as motion from "framer-motion/client";

async function Navbar() {
  
  const session = await getServerSession(authOptions);

  return (
    <motion.div className='fixed top-0 left-0 w-full h-16 border-black border-b-2 flex items-center justify-between px-2 md:px-5 bg-backgroundFirst z-50 text-black py-4'
    animate= {{y: [-60, 0],
      transition: {
        duration: 0.5,
      },
    }}
    >

      <Link 
      href={'/'} 
      className='cursor-pointer'>
        <Logo/>
      </Link>
      <div className='flex-grow md:hidden'></div>
      <SearchBtn/>

      <motion.div
      animate= {{x: [200, 0], 
        transition: {
          duration: 1,
          delay: 0.5
        }
      }}
      >
        {!session? <LoginBtn/> : <div>
          <PostBtn session={session}/>
        </div>}
      </motion.div>
    </motion.div>
  )
}

export default Navbar