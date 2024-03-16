"use client"
import React from 'react'
import {useUser } from '@clerk/nextjs'
import AdminModal from '@/components/main/AdminModal';
const page = () => {
  const {user} = useUser();
  console.log(user);
  return (
    <div className='w-full h-screen mt-7 relative'>
      <h4 className='text-center text-2xl font-medium '>Welcome {user?.firstName}</h4>
      <AdminModal className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"/>
    </div>
  )
}

export default page