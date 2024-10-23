'use client'
import { ExternalLink, LogOut, User } from 'lucide-react'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import React from 'react'
import { Popover, PopoverTrigger } from './ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion';

function PostBtn({session}: {session: Session}) {
    const router = useRouter()
  return (
    <div className='flex items-center space-x-2 ml-2'> 
        <motion.button className='border border-black p-2 w-24 md:w-28 text-sm md:text-md rounded-sm bg-backgroundSecond shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
        onClick={() => router.push('/post')}
        >
          New Post
        </motion.button>
        <Popover>
          <PopoverTrigger>
            {session.user.profilePicSrc ? <div className='relative -z-10 w-[40px] h-[40px] rounded-sm border border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <Image
              src={session.user.profilePicSrc}
              alt=''
              fill
              className=' object-cover'
              />
            </div>  :
              <User size={40}/>
            }
          </PopoverTrigger>
          <PopoverContent className='flex mr-4 mt-4 flex-col right-0 bg-backgroundFirst p-3 space-y-2 rounded-sm border-2 border-black'>
            <Link href={'/profile'}
            className='flex items-center justify-start p-2 space-x-1 rounded-sm bg-backgroundSecond shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black'>
              <User/>
              <div className='text-lg'>Profile</div>
            </Link>
            <Link href={'https://github.com/Harsh97563/Streakified'}
            className='flex items-center justify-start space-x-1 p-2 rounded-sm bg-backgroundSecond shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black'>
              <ExternalLink/>
              <div className='text-lg'>Github</div>
            </Link>
            <button
            className='flex items-center justify-start space-x-1 p-2 rounded-sm bg-backgroundSecond shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black'
            onClick={() => signOut({
              callbackUrl: "/"
            })}
            >
              <LogOut/>
              <div className='text-lg'>Logout</div>
            </button>
          </PopoverContent>

        </Popover>
        </div>
  )
}

export default PostBtn