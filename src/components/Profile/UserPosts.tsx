'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeedLoading from '../Feed/Loading';
import FeedPost from '../Feed/FeedPost';

interface UserPosts {
    username: string | undefined
}

function UserPosts({username}: UserPosts) {

    const [isLoading, setIsLoading] = useState(false);
    const [UserPosts, setUserPosts] = useState([]);

    useEffect(() => {

        async function getUserPosts() {
            try {

                setIsLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post?username=${username}`)
                console.log(response);
                setUserPosts(response.data.posts.posts)
                
            } catch (error) {
                
                console.error("Error while fetching user's posts.", error);
                
            } finally {
                setIsLoading(false)
            }
            
        }

        getUserPosts()
      

    }, [username])
    

  return (
    <div className=' mt-10 '>
        <div className='flex w-full justify-center items-center bg-backgroundSecond border-2 border-black p-2 text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-5'>Posts</div>

        {isLoading ? <FeedLoading/> : UserPosts.length === 0 ? 
        <div className='flex w-full justify-center text-xl '>
            User doesn&apos;t have any posts.
        </div> :
            UserPosts.map((post, i) => (
                <FeedPost key={i} postData={post}/>
            ))
        }

    </div>
  )
}

export default UserPosts