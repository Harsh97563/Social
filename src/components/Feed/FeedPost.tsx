import React from 'react'
import { ContentCarousel } from '../ContentCarousel'
import Image from 'next/image'
import { PostType } from '@/types/postType'
import LikeBtn from './Btns/LikeBtn'
import CommentBtn from './Btns/CommentBtn'
import Link from 'next/link'


function FeedPost({postData}: {postData: PostType}) {
    
  return (
    <div className='flex flex-col mb-6 text-black'>

        <Link href={`/profile?username=${postData.user.username}`} className='flex items-center text-xl justify-between bg-backgroundFirst border-2 border-black rounded-sm w-full p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <div className='flex items-center space-x-2'>
                <div className='relative w-[35px] h-[35px] rounded-sm border border-black overflow-hidden'>
                    <Image
                    loading='lazy'
                    src={postData.user.profilePicSrc}
                    alt='profile-pic'
                    fill
                    className='object-cover'
                    />
                </div>
                <div>{postData.user.username}</div>
            </div>
            {
                postData.streak?.streakCount &&
            <div className='flex items-center justify-center px-2 '>
                <div className='relative w-[28px] h-[28px] '>
                <Image
                src={"/Streak.gif"}
                alt='streak-logo'
                fill
                />
                </div>
                <div className='text-xl'>{postData.streak.streakCount}</div>
            </div>
            }
        </Link>
        
        {postData.files.length ?
        <div className={`bg-gray-950 rounded-t-sm border-t-2 border-x-2 border-black overflow-hidden mt-2`}> 
            <ContentCarousel files={postData.files}/>
        </div>
            : ""
        }

        {postData.caption? 
        <div className={`w-full bg-[#7E60BF] border-black border-x-2 pl-4 whitespace-pre-line p-2 ${!postData.files.length ? "rounded-t-sm mt-2 border-t-2" : ""} `}>
            {postData.caption}
        </div> : ""}
        
        <div className={`flex w-full justify-end bg-[#7E60BF] rounded-b-sm p-2 border-x-2 border-b-2 border-black space-x-2`}>
            <CommentBtn postid={postData.postId} />
            <LikeBtn postId={postData.postId} likes={postData.likesCount} likedBy={postData.LikedBy}/>
        </div>

    </div>
  )
}

export default FeedPost