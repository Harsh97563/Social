import React from 'react'
import Image from 'next/image';
function Logo() {
  return (
    <div className='relative w-40 h-10'>
        <Image
        src={"https://res.cloudinary.com/dc8yqhawq/image/upload/v1728274214/Strekified_tmyvza.gif"}
        alt='logo'
        fill
        />
    </div>
  )
}

export default Logo