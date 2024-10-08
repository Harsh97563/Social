'use client'
import axios from 'axios';
import { Loader, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';

function SearchBtn() {

  const [searchUsername, setSearchUsername] = useState('');
  const [users, setusers] = useState< {username: string, profilePicSrc: string}[] >([])
  const [isLoading, setIsLoading] = useState< boolean >(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {

    if(!searchUsername) {
      setusers([])
      return
    }
    
    const timeoutFn = setTimeout(async() => {

      try {
        setIsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/searchuser`, {
          params: { query: searchUsername } 
        })
  
        if(response.status !== 200) throw new Error ("Not able to retrive data.")

        setusers(response.data.users)
        
      } catch (error) {
        console.log(error);
        setusers([])
      } finally {
        setIsLoading(false);
      }

      
    }, 500)
    
  
    return () => {
      clearTimeout(timeoutFn)
    }
  }, [searchUsername])
  


  return (
    <motion.div className=' focus-within:absolute md:focus-within:relative md:relative group w-[96vw] md:max-w-96 bg-backgroundSecond rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border border-black '
    animate = {{y: [-60, 0],
      transition: {
        duration: 1,
        delay: 0.5
      }
    }}
    >
      <div 
      className='flex items-center space-x-2 justify-between w-full md:w-96 rounded-sm p-2'
      onClick={(e) => {
        console.log(e);
        
        searchInputRef.current?.focus()
      }}
      >
        <Search />

        <input type="text"
        ref={searchInputRef}
        placeholder='Search..'
        className='w-full outline-none flex focus:flex md:flex bg-transparent text-sm md:text-xl md:px-2'
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        />
      </div>
      <div className={`absolute -z-10 invisible group-focus-within:visible bg-[#96CEB4] w-full top-0 left-0 ${isLoading || users.length > 0 || searchUsername ? "pt-14" : ""} rounded-sm p-2`}>

        {isLoading ? <Loader size={30} className=' animate-spin w-full mx-auto'/> :
          users.length > 0 ? 
          <div>
            <motion.div className='flex flex-col space-y-3 p-2'
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            >
              {users.map((element, i) => (
                <motion.div 
                key={i}
                className='flex w-full space-x-2 bg-[#7E60BF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] items-center p-2 rounded-sm'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{scale: 1.04, border: "1px solid black"}}
                >
                  <div className='relative w-[35px] h-[35px] rounded-sm border overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-black'>
                    <Image
                    loading='lazy'
                    src={element.profilePicSrc}
                    alt='profile-pic'
                    fill
                    className='object-cover'
                    />
                  </div>
                  <div>{element.username}</div>
                </motion.div>
              ))}
            </motion.div>
          </div> :
          <div className='w-full text-center text-xl'>
          No user found.
          </div>
        }

      </div>
    </motion.div>
  )
}

export default SearchBtn