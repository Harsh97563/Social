'use client'
import axios from 'axios';
import { Loader, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link';

function SearchBtn() {

  const [searchUsername, setSearchUsername] = useState('');
  const [users, setusers] = useState< {username: string, profilePicSrc: string}[] >([])
  const [isLoading, setIsLoading] = useState< boolean >(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    <motion.div className=' focus-within:absolute md:focus-within:relative md:relative group focus-within:w-[96vw] md:max-w-96 bg-backgroundSecond rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border border-black z-[50] '
    animate = {{y: [-60, 0],
      transition: {
        duration: 1,
        delay: 0.5
      }
    }}
    >
      <div 
      className='flex items-center space-x-2 justify-between md:w-96 rounded-sm p-2 z-[999]'
      onClick={() => {
        setIsInputFocused(true)
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }}
      >
        <Search />

        <input type="text"
        ref={inputRef}
        placeholder='Search..'
        className={`w-full outline-none ${isInputFocused ? "flex" : "hidden"} md:flex bg-transparent text-sm md:text-xl md:px-2`}
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        onBlur={() => setIsInputFocused(false)}
        />
      </div>
      <div className={`absolute -z-10 invisible group-focus-within:visible bg-[#96CEB4] w-full top-0 left-0 ${isLoading || users.length > 0 || searchUsername ? "pt-14" : "hidden"} rounded-sm p-2`}>

        {isLoading ? <Loader size={30} className=' animate-spin w-full mx-auto'/> :
          users.length > 0 ? 
          <div>
            <motion.div className='flex flex-col space-y-3 p-2'
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            >
              {users.map((element, i) => (
                <Link key={i} href={`profile?username=${element.username}`}
                onClick={() => setSearchUsername("")}
                >
                  <motion.div 
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
                </Link>
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