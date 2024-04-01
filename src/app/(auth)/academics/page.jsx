"use client"
import ExcelReader from '@/components/main/AdminDisplay'
import { useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

const Academics = () => {
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
},[userId])
  return (
    <div className='w-9/10 mt-8 min-h-screen flex justify-center items-center'>
      {
        userPur.univerId !== 'none' &&
        <ExcelReader univerid={userPur.univerId}/>
      }
    </div>
  )
}

export default Academics