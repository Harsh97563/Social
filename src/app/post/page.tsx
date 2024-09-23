'use client'
import {postData} from '@/actions/Post/postData'
import { ContentCarousel } from '@/components/ContentCarousel';
import { Delete, FileUp, Image, Trash2 } from 'lucide-react'
import React, { ChangeEvent, useRef, useState } from 'react'

function Post() {

    const fileRef = useRef<HTMLInputElement>();
    const [caption, setcaption] = useState<string | null>('');
    const [files, setFiles] = useState<File[]>([]);

    function handleFileChnage(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
        
    }

    async function handlePost() {

        if(!caption && !files) return
        try {

            const response = await postData({files, caption});

            if(response?.success === false) {
                alert(response.message)
            }
            alert("Posted successfully.")
        } catch (error) {
            console.log("Unexpected error occured.", error);
            alert("Unexpected error occured.")
        }
    }

  return (

    <div className='w-[720px] mt-24 flex flex-col bg-gray-700 rounded-3xl p-5 '>
        <textarea
        placeholder='Give it a cool caption!'
        className='bg-transparent outline-none text-white text-xl overflow-hidden resize-none min-h-[40px] max-h-[300px]'
        onInput={(e: any) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`
        }}
        onChange={(e)=> setcaption(e.target.value)}
        />
        <div className='text-white flex flex-col min-h-[375px] items-center justify-center bg-gray-950 rounded-3xl overflow-hidden mt-7 '
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
                <div className='w-full h-full flex flex-col items-center justify-center hover:cursor-pointer'
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
        />
        <button
        className='text-white bg-gray-950 p-2 text-xl rounded-3xl'
        onClick={handlePost}
        >
            Post!
        </button>
    </div>
  )
}

export default Post