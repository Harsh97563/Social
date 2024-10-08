import Image from 'next/image'
import React from 'react'

interface CommentData {
    comment: string,
    id: string,
    user: {
        username: string,
        profilePicSrc: string
    },
    userId: string
}

function Comment({data}: {data:CommentData}) {
  return (
    <div className='flex flex-col w-full text-black p-3 bg-[#384B70] rounded-sm px-4 space-y-2 border-2 border-black'>
        <div className='flex items-center space-x-2'>
            <div className='relative w-6 h-6 rounded-sm border border-black overflow-hidden'>
                <Image
                src={data.user.profilePicSrc}
                alt='profile-pic'
                fill
                className=' object-cover'
                />

            </div>
            <div className='text-white'>{data.user.username}</div>
        </div>
        <div className='w-full bg-backgroundSecond shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 rounded-sm border border-black '>{data.comment}</div>
    </div>
  )
}

export default Comment