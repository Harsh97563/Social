'use client'
import { signIn } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import {Loader} from 'lucide-react';


function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    
    if(!username || !password) {
      seterror("Please fill all fields.")
      return
    }

    if(password.length < 6) {
      seterror("Password must contain at least 6 characters.")
      return
    }

    setIsLoading(true);
    seterror('');

    try {
      const response = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: username,
        password
      })
      
      if(response?.error) {
        console.log(error);
        seterror("Invalid Credentials.")
      }else {
        window.location.href = "/"
      }
      
    } catch (error) {
      console.log(error);
      seterror("Unexpected error occurs.")
      
    } finally {

      setIsLoading(false)

    }

  }

  return (

    <div className='flex w-full h-screen items-center justify-center '>
      <div className='flex space-y-3 flex-col bg-gray-800 p-10 rounded-3xl'>
        <button className='bg-gray-900 p-5 w-[20vw] rounded-lg text-xl mb-5'
        onClick={() => signIn('google', {
          callbackUrl: "/"
        })}
        >Continue with Google</button>

        <p className='border-b leading-[0.5px] text-center my-5'>
          <span className='bg-gray-800'>or</span>
        </p>

        <form 
        className='flex flex-col space-y-2 pt-5'
        onSubmit={handleSubmit}
        >
          <div className={`${error? "": "hidden"} text-red-500`}>
            {error}
          </div>
          <input 
          className='bg-gray-900 p-5 w-[20vw] rounded-lg text-xl outline-none' 
          type="text" 
          placeholder='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            seterror('')
          }} 
          />
          <input 
          className='bg-gray-900 p-5 w-[20vw] rounded-lg text-xl outline-none'
          type="password" 
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            seterror('')
          }} 
          />
          
          <button className={`flex bg-gray-900 p-5 w-[20vw] justify-center rounded-lg text-xl disabled:cursor-not-allowed`}
          disabled = {isLoading}
          >{isLoading? 
          <Loader className=' animate-spin'/> :"Sign In"
          }</button>

        </form>
        
      </div>
    </div>

  )
}

export default SignIn