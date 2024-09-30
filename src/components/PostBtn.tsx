'use client'
import { User } from 'lucide-react'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import React from 'react'
import { Popover, PopoverTrigger } from './ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import { signOut } from 'next-auth/react'

function PostBtn({session}: {session: Session}) {
    const router = useRouter()
  return (
    <div className='flex items-center space-x-2'> 
        <button className='border border-black p-2 w-28 rounded-md bg-gray-600'
        onClick={() => router.push('/post')}
        >
          New Post
        </button>
        <Popover>
          <PopoverTrigger>
            {session.user.profilePicSrc ? <Image
              src={session.user.profilePicSrc}
              alt=''
              width={40}
              height={40}
              className=' rounded-full'
              /> :
              <User size={40}/>
            }
          </PopoverTrigger>
          <PopoverContent className='flex mr-4 mt-4 flex-col right-0 bg-gray-950 p-3 space-y-2 rounded-lg'>
            <Link href={'/profile'}
            className='p-2 rounded-lg bg-gray-600'>
              My Profile
            </Link>
            <button
            className='p-2 rounded-lg bg-gray-600'
            onClick={() => signOut({
              callbackUrl: "/"
            })}
            >Logout</button>
          </PopoverContent>

        </Popover>
        </div>
  )
}

export default PostBtn