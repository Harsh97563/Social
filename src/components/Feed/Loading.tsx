import React from 'react'

function FeedLoading() {
  return (
    <div className='flex flex-col'>
        <div className='bg-gradient-to-tr from-gray-800 to-gray-950 animate-pulse rounded-3xl w-full p-5'/>
        <div className='min-h-[375px] bg-gradient-to-r from-gray-800 to-gray-950 animate-pulse rounded-3xl mt-2 mb-3'/>
        <div className='bg-gradient-to-tl from-gray-800 to-gray-950 animate-pulse rounded-3xl w-full p-5'/>
        <div className='min-h-[375px] bg-gradient-to-l from-gray-800 to-gray-950 animate-pulse rounded-3xl mt-2'/>
    </div>
  )
}

export default FeedLoading