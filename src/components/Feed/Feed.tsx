'use client'
import React, { useEffect } from 'react';
import FeedPost from './FeedPost';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import FeedLoading from './Loading';
import { LoaderCircle } from 'lucide-react';
import { useInView } from "react-intersection-observer";
import { PostType } from '@/types/postType';


async function getFeeds({pageParam = 1}) {

    try {
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feed`, {
            params: {
                pageParam
            }
        })
    
        const feeds = response.data.posts
        const nextPage = response.data.nextPage;
    
        return {feeds, nextPage}
        
    } catch (error) {
        console.log("Error while fetching the feeds.", error);
        
    }

}


function Feed() {

    const {ref, inView} = useInView({
        rootMargin: "400px"
    })

    const {data, isFetching, hasNextPage, fetchNextPage} = useInfiniteQuery({
        queryKey: ['feeds'],
        queryFn: getFeeds,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined
    })
    
    useEffect(() => {

        if(inView && hasNextPage) {
            fetchNextPage()
        }
        
    }, [inView, hasNextPage, fetchNextPage])
    
  return (
    <div className='flex flex-col h-full w-[720px] min-h-screen p-2 md:p-5 md:border-x text-white'>
        {!data ? <FeedLoading/>: 
        data?.pages.map((page, i) => (
            <div key={i}>
                {page?.feeds.map((post: PostType) => (

                    <FeedPost key={post.postId} postData={post}/>
                ))}
            </div>
        ))}

        <div 
        ref={ref}
        className='flex w-full justify-center text-xl'>
            {isFetching? <LoaderCircle size={40} className=' animate-spin'/> :
            !hasNextPage ? "No more posts to load." : ""
            }
        </div>
    </div>
  )
}

export default Feed