"use client"
import TeacherExcelReader from '@/components/main/TeachersData';
import { useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

const Teachers = () => {
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
    <div className='w-[98%] min-h-screen flex justify-center items-center'>
      {
        userPur.univerId !== 'none' &&
        <TeacherExcelReader univerid={userPur.univerId}/>
      }
    </div>
  )
}

export default Teachers