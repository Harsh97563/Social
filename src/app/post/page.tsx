'use client'
import {postData} from '@/actions/Post/postData'
import { ContentCarousel } from '@/components/ContentCarousel';
import { useToast } from '@/hooks/use-toast';
import { FileUp, ImageIcon, Loader2, SmilePlus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import { Theme } from 'emoji-picker-react';
import { motion } from 'framer-motion';
import { StreakTypes } from '@prisma/client';
import { useSession } from 'next-auth/react';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

function Post() {

    const fileRef = useRef<HTMLInputElement>();
    const [caption, setcaption] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [isPosting, setIsPosting] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState<number | null>(null);
    const {toast} = useToast();
    const router = useRouter();
    const { update } = useSession();

    function handleFileChnage(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
        
    }

    async function handlePost() {

        if(!caption && !files.length){
            toast({
                description: "Either caption or file needed.",
                className: "bg-gray-950 text-white border-red-500",
                duration: 2000
            })
            return
        }

        try {
            setIsPosting(true)

            const streakType = selectedDays == 10 ? StreakTypes.DAYS10 : selectedDays == 30 ? StreakTypes.DAYS30 : selectedDays == 60 ? StreakTypes.DAYS60 : selectedDays == 100 ? StreakTypes.DAYS100 : null

            const response = await postData({files, caption, streakType});

            if(response.streakId) {
                await update({streakId: response.streakId})
            }

            toast({
                description: "Posted Successfully.",
                className: "bg-gray-950 text-white border-green-500",
                duration: 2000
            })
            router.push('/')
            
        } catch (error) {
            console.log(error);
            
            toast({
                description: "Unexpected error occured.",
                className: "bg-gray-950 text-white border-red-500",
                duration: 2000
            })

        } finally {
            setIsPosting(false)
            setcaption('')
            setFiles([])
        }
    }

  return (

    <div className='md:w-[720px] mx-2 md:mx-auto mt-5 flex flex-col bg-gray-700 rounded-3xl p-5 '>

        <textarea
        value ={caption}
        placeholder='Give it a cool caption!'
        className='bg-transparent outline-none text-white text-xl overflow-hidden resize-none min-h-[40px] max-h-[300px]'
        // Change ANYYY
        onInput={(e: any) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`
        }}
        onChange={(e)=> setcaption(e.target.value)}
        disabled={isPosting}
        />
        <div className='w-full flex justify-end invisible lg:visible'>
            <SmilePlus
            size={25}
            className=' hover:cursor-pointer z-20 text-gray-200' 
            onClick={() => setEmojiOpen(!emojiOpen)}
            />
            <div className='absolute z-40 mt-10'>
                <Picker
                open={emojiOpen}
                theme={Theme.DARK}
                searchDisabled={true}
                className='w-full'
                lazyLoadEmojis={true}
                onEmojiClick={(emojiObj) => setcaption((prev) => prev + emojiObj.emoji )}
                />
            </div>
        </div>
        <div className={`relative text-white flex group flex-col min-h-[375px] items-center justify-center bg-gray-950 ${isPosting ? "bg-gray-800 cursor-not-allowed" : ""} rounded-3xl overflow-hidden mt-7 `}
        >
            {files.length ? <div className='w-full'>
                <ContentCarousel files={files}/>
                <ImageIcon size={30} className='absolute invisible group-hover:visible cursor-pointer right-16 bg-black rounded-full p-1 text-white top-2'
                onClick={() => fileRef.current?.click()}
                />
                <Trash2 size={30} className='absolute invisible group-hover:visible cursor-pointer right-6 bg-black rounded-full p-1 text-white top-2'
                onClick={() => setFiles([])}
                />

            </div>  :
                <div className='absolute w-full h-full flex flex-col items-center justify-center hover:cursor-pointer bg-transparent'
                onClick={() => fileRef.current?.click()}
                >
                    <div>
                        <FileUp size={30}/>
                    </div>
                    <div>
                        Click here to add a Image. 
                    </div>
                </div>
            }
        </div>
        <input
        // @ts-expect-error getting the types is creating problem
        ref={fileRef} 
        type="file"
        multiple={true}
        accept='.png, .jpeg, .jpg'
        className='invisible'
        onChange={(e) => handleFileChnage(e)}
        disabled={isPosting}
        />
        <div className='w-full bg-gray-950 text-white p-2 rounded-xl'>
            <div className='text-xl'>Select days for your streak.</div>
            <div className='flex space-x-4 my-2'>

                <motion.div className='bg-gray-700 p-2 rounded-xl'
                animate= {{
                    scale: selectedDays === 10 ? 1.1 : 1,
                    backgroundColor: selectedDays === 10 ? "#1f2937" : "",
                    border: selectedDays === 10 ? "1px solid #fafafa" : ""
                }}
                onClick={() => setSelectedDays(selectedDays !== 10 ? 10 : null)}
                >10 Days</motion.div>
                <motion.div className='bg-gray-700 p-2 rounded-xl'
                animate= {{
                    scale: selectedDays === 30 ? 1.1 : 1,
                    backgroundColor: selectedDays === 30 ? "#1f2937" : "",
                    border: selectedDays === 30 ? "1px solid #fafafa" : ""
                }}
                onClick={() => setSelectedDays(selectedDays !== 30 ? 30 : null)}
                >30 Days</motion.div>
                <motion.div className='bg-gray-700 p-2 rounded-xl'
                animate= {{
                    scale: selectedDays === 60 ? 1.1 : 1,
                    backgroundColor: selectedDays === 60 ? "#1f2937" : "",
                    border: selectedDays === 60 ? "1px solid #fafafa" : ""
                }}
                onClick={() => setSelectedDays(selectedDays !== 60 ? 60 : null)}
                >60 Days</motion.div>
                <motion.div className='bg-gray-700 p-2 rounded-xl'
                animate= {{
                    scale: selectedDays === 100 ? 1.1 : 1,
                    backgroundColor: selectedDays === 100 ? "#1f2937" : "",
                    border: selectedDays === 100 ? "1px solid #fafafa" : ""
                }}
                onClick={() => setSelectedDays(selectedDays !== 100 ? 100 : null)}
                >100 Days</motion.div>

            </div>
        </div>
        <button
        className='text-white flex justify-center bg-gray-950 disabled:bg-gray-800 disabled:cursor-not-allowed p-2 text-xl rounded-3xl mt-4'
        onClick={handlePost}
        disabled={isPosting}
        >
            {isPosting ? <Loader2 size={32} className=' animate-spin'/> : "Post!"}
        </button>
    </div>
  )
}

export default Post