"use client"
import React, { useEffect, useState } from 'react'
import {useAuth, useUser } from '@clerk/nextjs'
import AdminModal from '@/components/main/AdminModal';
import { ref, child, get } from "firebase/database";
import { database } from '@/firebase';
import { useRouter } from 'next/navigation';
import ShiftTimingForm from '@/components/main/ShiftCard';
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