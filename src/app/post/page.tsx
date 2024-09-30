'use client'
import {postData} from '@/actions/Post/postData'
import { ContentCarousel } from '@/components/ContentCarousel';
import { useToast } from '@/hooks/use-toast';
import { FileUp, Image, Loader2, SmilePlus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import { Theme } from 'emoji-picker-react';
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
    const {toast} = useToast();
    const router = useRouter()

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
            const response = await postData({files, caption});

            if(!response?.success) throw new Error();

            toast({
                description: "Posted Successfully.",
                className: "bg-gray-950 text-white border-green-500",
                duration: 2000
            })
            router.push('/')
            
        } catch (error) {

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
        <div className={`text-white flex flex-col min-h-[375px] items-center justify-center bg-gray-950 ${isPosting ? "bg-gray-800 cursor-not-allowed" : ""} rounded-3xl overflow-hidden mt-7 `}
        >
            {files.length ? <div className='relative group'>
                <ContentCarousel files={files}/>
                <Image size={30} className='absolute invisible group-hover:visible cursor-pointer right-16 bg-black rounded-full p-1 text-white top-2'
                onClick={() => fileRef.current?.click()}
                />
                <Trash2 size={30} className='absolute invisible group-hover:visible cursor-pointer right-6 bg-black rounded-full p-1 text-white top-2'
                onClick={() => setFiles([])}
                />

            </div>  :
                <div className='w-full h-full flex flex-col items-center justify-center hover:cursor-pointer bg-transparent'
                onClick={() => fileRef.current?.click()}
                >
                    <div>
                        <FileUp size={30}/>
                    </div>
                    <div>
                        Click here to add a Image/Video. 
                    </div>
                </div>
            }
        </div>
        <input
        // @ts-ignore
        ref={fileRef} 
        type="file"
        multiple={true}
        className='invisible'
        onChange={(e) => handleFileChnage(e)}
        disabled={isPosting}
        />
        <button
        className='text-white flex justify-center bg-gray-950 disabled:bg-gray-800 disabled:cursor-not-allowed p-2 text-xl rounded-3xl'
        onClick={handlePost}
        disabled={isPosting}
        >
            {isPosting ? <Loader2 size={32} className=' animate-spin'/> : "Post!"}
        </button>
    </div>
  )
}

export default Post