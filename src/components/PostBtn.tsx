'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function PostBtn() {
    const router = useRouter()
  return (
    <div> 
            <button className='border border-black p-2 w-28 rounded-md bg-gray-600'
            onClick={() => router.push('/post')}
            >
              New Post
            </button>
        </div>
  )
}

export default PostBtn