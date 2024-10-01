import { Search } from 'lucide-react'
import React from 'react'

function SearchBtn() {
  return (
    <div 
      className='flex items-center justify-center invisible md:visible md:w-96 bg-gray-700 p-2 rounded-2xl'>
        <Search/>
        <input type="text"
        placeholder='Search..'
        className='w-full outline-none bg-transparent text-xl px-2'
        />
      </div>
  )
}

export default SearchBtn