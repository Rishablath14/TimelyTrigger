"use client"
import React, { useEffect, useState } from 'react'
import {useAuth, useUser } from '@clerk/nextjs'
import AdminModal from '@/components/main/AdminModal';
import { useRouter } from 'next/navigation';
import ShiftTimingForm from '@/components/main/ShiftCard';
import Link from 'next/link';
const page = () => {
  const router = useRouter();
  const {user,isLoaded} = useUser();
  const {userId} = useAuth();
  const [userPur,setUserPur] = useState([]);
  useEffect(()=>{
    if(userId){
    const getData= async()=>{
        const res = await fetch('/api/users');
        const data = await res.json();
        setUserPur(data.publicMetadata);
        // if(!data.publicMetadata.subscriber){
        //   toast.error("You have not Subscribed to any plan!");
        //   router.push("/");
        // }  
    }
        getData();
    
    }
},[])
    // useEffect(()=>{
    //   get(child(database, `universities/`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   }).catch((error) => {
    //     console.error(error);
    //   });
    // },[])
    if (!isLoaded) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          Checking...
        </div>
      );
    }
  return (
    <div className='w-full min-h-screen mt-7 relative'>
      { userPur.univerId !== 'none' ?
      userPur.timing?
      <>
      <div className='w-9/10 min-h-screen flex justify-center items-center overflow-x-scroll'> 
       <Link href="/academics" className='border border-black text-black dark:border-white rounded-lg p-2 m-2 text-xl dark:text-white'>Upload Academics Data</Link>
       <Link href="/teachers" className='border  border-black text-black dark:border-white rounded-lg p-2 m-2 text-xl dark:text-white'>Upload Teachers Data</Link>
       <Link href="/classroom" className='border border-black text-black dark:border-white rounded-lg p-2 m-2 text-xl dark:text-white'>Upload Classroom Data</Link>
       </div>
      </>
      :
      <>
        <h4 className='text-center text-2xl font-medium '>Welcome {user?.firstName}</h4>
        <ShiftTimingForm univerid={userPur.univerId}/>
      </>
        :
      <AdminModal className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"/>
      }
    </div>
  )
}

export default page