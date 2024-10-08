'use client'
import React from 'react'
import { signIn } from 'next-auth/react';

function LoginBtn() {

  return (
    <>
      <button className='bg-backgroundSecond p-2 px-4 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg border-2 border-black ml-2'
      onClick={() => signIn()}
      >
        Login
      </button>
    </>
  )
}

export default LoginBtn