'use client'
import React from 'react'
import { signIn } from 'next-auth/react';

async function LoginBtn() {

  return (
    <>
      <button className='bg-gray-600 p-2 rounded-xl'
      onClick={() => signIn()}
      >
        Login
      </button>
    </>
  )
}

export default LoginBtn