'use client'
import { Loader2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import PostComment from './PostComment';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import Comment from './Comment';

interface Comments {
    showComments: boolean,
    setShowComments: any,
    postId: string
}

function CommentModel({showComments, setShowComments, postId}: Comments) {

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {

        if(!showComments) return

        async function getComments() {

            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/comments`, {
                    params: {
                        postId
                    }
                })
                
                if(response.status === 200) {
                    setComments(response.data.comments.comments)
                }
    
            } catch (error) {
                console.error("Error fetching comments,", error);
                toast({
                    description: "Cannot fetch comments.",
                    className: "bg-gray-950 text-white border-red-500",
                    duration: 2000
                })
                return
                
            } finally {
                setIsLoading(false)
            }
        }

        getComments()

    }, [showComments, postId, toast])
    

    
  return (

    <div className={`${showComments ? "fixed" : "hidden"} flex z-40 items-end justify-center top-0 -left-2 w-full h-full bg-gray-700 bg-opacity-60`}>

        <motion.div className='w-[720px] flex flex-col rounded-t-3xl h-[60%] relative bottom-0 bg-gray-900'
        animate= {{
            y: showComments ? [200, 0] : 0,
            transition: {
                duration: 0.3
            }
        }}
        >
            <div className='flex justify-between border-b p-4 '>
                <div className='text-xl'>Comments</div>
                <motion.button
                onClick={() => setShowComments(false)}
                whileHover={{rotate: 180, color: "#d62f43", scale: 1.2}}
                >
                    <X/>
                </motion.button>
            </div>

            <div className='flex h-full w-full overflow-y-scroll justify-center'>
                {isLoading ? <Loader2 className='animate-spin'/> : 
                    comments.length == 0 ? <div className='text-xl text-white'>No Comments.</div> : <div className='w-full space-y-2 m-2'>
                        {comments.map((comment, id) => (
                            <Comment key={id} data={comment} />
                        ))}
                    </div>
                }
            </div>

            <PostComment postId={postId} />

        </motion.div>
    </div>
  )
}

export default CommentModel