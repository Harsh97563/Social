import { Loader2, Send } from 'lucide-react'
import React, { useState } from 'react'
import {motion} from "framer-motion";
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

function PostComment({postId}: {postId: string}) {

    const session = useSession();
    const { toast } = useToast();
    const [comment, setComment] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    async function handleComment() {

        if(!session || !session.data) {
            toast({
                description: "Login to comment.",
                className: "bg-gray-950 text-white border-red-500",
                duration: 1000
            })
            return
        }

        if(!comment) {
            toast({
                description: "Comment cannot be empty.",
                className: "bg-gray-950 text-white border-red-500",
                duration: 2000
            })
            return
        }

        try {
            setIsPosting(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/post/comments`, {

                userId: session.data.user.userId,
                postId,
                comment,

            })

            if(response.status === 200) {
                setComment('')
                toast({
                    description: "Comment posted successfully.",
                    className: "bg-gray-950 text-white border-green-500",
                    duration: 2000
                })
                return
            }


        } catch (error) {
            console.log("Error while posting comment.", error);
            toast({
                description: "Comment cannot be empty.",
                className: "bg-gray-950 text-white border-red-500",
                duration: 2000
            })
        } finally {
            setIsPosting(false)
        }



    }

  return (
    <div className='flex bg-gray-700 p-2 px-4 pb-4 rounded-t-2xl w-full'>

        <input type="text" className='bg-transparent w-full p-1 disabled:cursor-not-allowed text-white text-xl outline-none'
        placeholder='Add a comment...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isPosting}
        />

        <motion.button
        whileHover={{x: 5, y: -2, color: "green", scale: 1.2}}
        onClick={handleComment}
        >
            {isPosting ? <Loader2 className=' animate-spin'/> :<Send/>}
        </motion.button>

    </div>
  )
}

export default PostComment