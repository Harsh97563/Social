
import { MessageCircle } from 'lucide-react'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import CommentModel from '@/components/Comment/CommentModel';

function CommentBtn({postid}: {postid: string}) {
    const [showComments, setShowComments] = useState(false);

  return (
    <>
        <motion.div className=' hover:text-backgroundSecond'
        animate= {{
            y: showComments ? [0, 50, 0] : 0,
            transition: {
                duration: 0.3
            }
        }}
        whileHover={{
          y: -3
        }}
        >
        <MessageCircle size={30}
        onClick={() => setShowComments(!showComments)}
        />
        </motion.div>
        <CommentModel showComments={showComments} setShowComments={setShowComments} postId={postid} />
    </>
  )
}

export default CommentBtn