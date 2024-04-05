"use client"
import GenerateTimeTable from '@/components/main/Timetables'
import React, { useEffect, useState } from 'react'
import {useAuth} from '@clerk/nextjs'
const Timetable = () => {
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
if (!userId) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      Loading...
    </div>
  );
}
  return (
    <div className='max-w-full min-h-[calc(100vh-80px)] my-4'>
      <GenerateTimeTable univerid={userPur.univerId}/>
    </div>
  )
}

export default Timetable