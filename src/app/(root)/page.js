import Blogs from '@/components/main/Blogs'
import Skills from "@/components/main/Services";
import Contact from '@/components/main/Contact'
import Hero from '@/components/main/Hero'
import Pricing from '@/components/main/Pricing'
import React from 'react'

const page = () => {
  return (
    <>
    <div className="flex flex-col">
      <Hero />
      <Skills/>
      <Pricing/>
      <Blogs/>
      <Contact/>
    </div>
    </>
  )
}

export default page