import Image from 'next/image'
import React from 'react'

const loading = () => {
  return (
    <div className='grid place-items-center w-screen h-screen'>
    <Image src="/TTlogo.png"
    alt="logo"
    width={300}
    height={300}
    className="cursor-pointer animate-bounce w-10 h-10 lg:w-[300px] lg:h-[300px]"
    />
    </div>
  )
}

export default loading