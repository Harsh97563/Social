import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'
import PostBtn from './PostBtn';

async function LoginBtn() {
    const session = await getServerSession(authOptions);

  return (
    <div>
        {session ? <PostBtn/> : 
        <button>
            Login
        </button>}
    </div>
  )
}

export default LoginBtn