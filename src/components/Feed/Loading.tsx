import React from 'react'

function FeedLoading() {
  return (
    <div className='flex flex-col'>
        <div className='bg-gray-950 animate-pulse rounded-3xl w-full p-5'/>
        <div className='min-h-[375px] bg-gray-950 animate-pulse rounded-3xl mt-2 mb-3'/>
        <div className='bg-gray-950 animate-pulse rounded-3xl w-full p-5'/>
        <div className='min-h-[375px] bg-gray-950 animate-pulse rounded-3xl mt-2'/>
    </div>
  )
}

export default FeedLoading