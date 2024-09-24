import { Heart, MessageCircle, Share2 } from 'lucide-react'
import React from 'react'
import { ContentCarousel } from '../ContentCarousel'
import Image from 'next/image'
import { PostType } from '@/types/postType'


function FeedPost({postData}: {postData: PostType}) {

  return (
    <div className='flex flex-col mb-2'>

        <div className='flex items-center space-x-2 text-white bg-gray-950 rounded-3xl w-full p-2'>
            <Image
            loading='lazy'
            src={postData.user.profilePicSrc}
            alt='profile-pic'
            width={35}
            height={35}
            className=' rounded-xl'
            />
            <div>{postData.user.username}</div>
        </div>
        
        {postData.files.length ?
        <div className={`text-white flex flex-col min-h-[375px] items-center justify-center bg-gray-950 rounded-t-3xl overflow-hidden mt-2`}> 
            <ContentCarousel files={postData.files}/>
        </div>
            : ""
        }

        {postData.caption? 
        <div className={`w-full bg-gray-950 pl-4 text-white p-2 ${!postData.files.length ? "rounded-t-3xl mt-2" : ""} `}>
            {postData.caption}
        </div> : ""}
        
        <div className='flex w-full justify-end bg-gray-950 rounded-b-3xl text-white p-2 space-x-2'>
            <Share2 size={30}/>
            <MessageCircle size={30}/>
            <Heart size={30} fill='red'/>
        </div>

    </div>
  )
}

export default FeedPost