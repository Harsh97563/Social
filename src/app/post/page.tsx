'use client'
import {postData} from '@/actions/Post/postData'
import { ContentCarousel } from '@/components/ContentCarousel';
import { useToast } from '@/hooks/use-toast';
import { FileUp, ImageIcon, Loader2, SmilePlus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import { Theme } from 'emoji-picker-react';
import { StreakTypes } from '@prisma/client';
import DaysOptionBtn from '@/components/DaysOptionBtn';

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
    const [selectedDays, setSelectedDays] = useState<StreakTypes | null>(null);
    const {toast} = useToast();
    const router = useRouter();

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
            await postData({files, caption, streakType: selectedDays});

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

    <div className='md:w-[720px] mx-3 border-2 border-black md:mx-auto mt-5 flex flex-col bg-[#384B70] rounded-sm p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] '>

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
        <div className={`relative text-white flex group flex-col min-h-[375px] items-center justify-center bg-gray-950 ${isPosting ? "bg-gray-800 cursor-not-allowed" : ""} rounded-sm overflow-hidden mt-7 `}
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

        <div className='w-full bg-backgroundThird border-2 border-black text-black p-2 rounded-sm'>
            <div className='text-xl'>Select days for your streak.</div>
            <div className='flex space-x-4 my-2 text-sm md:text-xl'>

                <DaysOptionBtn days={StreakTypes.DAYS10} setSelectedDays={setSelectedDays} selectedDays={selectedDays}  />
                <DaysOptionBtn days={StreakTypes.DAYS30} setSelectedDays={setSelectedDays} selectedDays={selectedDays}  />
                <DaysOptionBtn days={StreakTypes.DAYS60} setSelectedDays={setSelectedDays} selectedDays={selectedDays}  />
                <DaysOptionBtn days={StreakTypes.DAYS100} setSelectedDays={setSelectedDays} selectedDays={selectedDays}  />

            </div>
        </div>

        <button
        className='flex justify-center border-2 border-black bg-backgroundSecond disabled:opacity-70 disabled:cursor-not-allowed p-2 text-xl rounded-sm mt-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
        onClick={handlePost}
        disabled={isPosting}
        >
            {isPosting ? <Loader2 size={32} className=' animate-spin'/> : "Post!"}

        </button>
    </div>
  )
}

export default Post