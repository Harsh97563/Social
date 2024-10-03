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
    <div className='flex flex-col w-[56] text-white p-2 bg-gray-800 rounded-xl px-4 space-y-2'>
        <div className='flex items-center space-x-2'>
            <div className='relative w-6 h-6'>
                <Image
                src={data.user.profilePicSrc}
                alt='profile-pic'
                fill
                className='rounded-lg'
                />

            </div>
            <div>{data.user.username}</div>
        </div>
        <div className='w-full bg-gray-950 p-4 rounded-xl '>{data.comment}</div>
    </div>
  )
}

export default Comment