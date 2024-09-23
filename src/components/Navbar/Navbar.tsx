import React from 'react'
import LoginBtn from '../LoginBtn'
import { Search } from 'lucide-react'

function Navbar() {
  return (
    <div className='fixed left-0 w-full flex items-center rounded-md border justify-between px-5 mt-3 text-white py-2'>
        <div className=' text-xl font-extrabold text-black border-2 border-black p-1 tracking-wide'>
            Strekial
        </div>
        <div className='flex items-center justify-center w-96 bg-gray-700 p-2 rounded-2xl'>
            <Search/>
            <input type="text"
            placeholder='Search..'
            className='w-full outline-none bg-transparent text-xl px-2'
            />
        </div>
        <div>
            <LoginBtn/>
        </div>
    </div>
  )
}

export default Navbar