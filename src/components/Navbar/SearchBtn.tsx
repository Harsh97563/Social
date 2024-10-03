'use client'
import axios from 'axios';
import { Loader, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';

function SearchBtn() {

  const [searchUsername, setSearchUsername] = useState('');
  const [users, setusers] = useState< {username: string, profilePicSrc: string}[] >([])
  const [isLoading, setIsLoading] = useState< boolean >(false);

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
    <div className=' relative group transition-all w-9 md:w-96 mx-2 focus-within:w-[90%] md:focus-within:w-96 overflow-hidden focus-within:overflow-visible focus-within:absolute md:focus-within:relative md:overflow-visible bg-gray-700 focus-within:bg-gray-800 rounded-xl md:rounded-3xl'>
      <div 
      className='flex items-center justify-center w-36 md:w-96 bg-gray-700 focus-within:bg-gray-800 p-2 rounded-2xl'>
        <Search />
        <input type="text"
        placeholder='Search..'
        className='w-full outline-none bg-transparent text-sm md:text-xl px-2'
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        />
      </div>
      <div className={`absolute -z-10 invisible group-focus-within:visible bg-gray-800 w-full top-0 left-0 ${isLoading || users.length > 0 || searchUsername ? "pt-14" : ""} rounded-lg p-2`}>

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
                className='flex w-full space-x-2 bg-gray-700 items-center p-2 rounded-xl'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{scale: 1.04, border: "1px solid black"}}
                >
                  <Image
                  loading='lazy'
                  src={element.profilePicSrc}
                  alt='profile-pic'
                  width={35}
                  height={35}
                  className=' rounded-xl'
                  />
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
    </div>
  )
}

export default SearchBtn