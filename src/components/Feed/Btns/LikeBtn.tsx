'use client'
import { Heart } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

interface LikeBtn {
  postId: string,
  likes: number,
  likedBy: [] | undefined,
}

function LikeBtn({postId, likes, likedBy}: LikeBtn) {
  
  const session = useSession();
  const [liked, setLiked] = useState(() => likedBy?.length ? true : false);
  const [likesCount, setlikesCount] = useState(likes);
  const { toast } = useToast()

  const handleLike = useCallback(async () => {

    if(!session || !session.data) {
      toast({
        description: "Login to like the post.",
        className: "bg-gray-950 text-white border-red-500",
        duration: 1000
      })
      return
    }

    setLiked(!liked);
    setlikesCount((prev) => !liked ? prev +1 : prev -1)

    try {
        
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post/likes`, {
        postId,
        type: !liked ? "LIKE" : "UNLIKE"
      })

    } catch (error: any) {
      setLiked(!liked)
      setlikesCount((prev) => liked ? prev +1 : prev -1)
      console.error("Error while liking/unliking post.", error);
    }


  }, [liked, session, postId, toast])

  

  return (
    <motion.div className='flex text-center items-center justify-center text-xl space-x-1'
    animate= {{
      scale: liked ? [1, 1.2, 1] : 1,
      rotate: liked ? [0, 15, -15, 0]: 0,
      y: liked ? [0, -15, 0]: 0,
      transition: {
        duration: 0.5
      }
    }}
    onClick={handleLike}
    >
    <div>{likesCount == 0 ? "": likesCount}</div>
    <Heart size={30} className={` transition-colors ${liked ? "text-red-500 fill-current" : ""}`}/> 
    </motion.div>
  )
}

export default LikeBtn