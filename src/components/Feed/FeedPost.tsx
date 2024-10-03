import React from 'react'
import { ContentCarousel } from '../ContentCarousel'
import Image from 'next/image'
import { PostType } from '@/types/postType'
import LikeBtn from './Btns/LikeBtn'
import CommentBtn from './Btns/CommentBtn'


function FeedPost({postData}: {postData: PostType}) {

  return (
    <div className='flex flex-col mb-2'>

        <div className='flex items-center space-x-2 text-white bg-gray-950 rounded-3xl w-full p-2'>
            <div className='relative w-[35px] h-[35px]'>
                <Image
                loading='lazy'
                src={postData.user.profilePicSrc}
                alt='profile-pic'
                fill
                className='rounded-xl object-cover'
                />
            </div>
            <div>{postData.user.username}</div>
        </div>
        
        {postData.files.length ?
        <div className={`bg-gray-950 rounded-t-3xl overflow-hidden mt-2`}> 
            <ContentCarousel files={postData.files}/>
        </div>
            : ""
        }

        {postData.caption? 
        <div className={`w-full bg-gray-950 pl-4 whitespace-pre-line text-white p-2 ${!postData.files.length ? "rounded-t-3xl mt-2" : ""} `}>
            {postData.caption}
        </div> : ""}
        
        <div className='flex w-full justify-end bg-gray-950 rounded-b-3xl text-white p-2 space-x-2'>
            <CommentBtn postid={postData.postId} />
            <LikeBtn postId={postData.postId} likes={postData.likesCount} likedBy={postData.LikedBy}/>
        </div>

    </div>
  )
}

export default FeedPost