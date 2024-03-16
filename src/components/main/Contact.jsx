"use client"
import React, { useState } from 'react'
import SkillText from '../sub/SkillText'
import toast from 'react-hot-toast'
import Image from 'next/image'

const Contact = () => {
  const [userEmail, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (userEmail === "") {
      toast.error("Email is required!");
    }
    else if (phoneNumber === "") {
      toast.error("Phone number is required!");
    } else if (phoneNumber.length>10 || phoneNumber.length<10) {
      toast.error("Enter Valid Phone Number!");
    } else if (subject === "") {
      toast.error("Please give your Subject!");
    } else if (message === "") {
      toast.error("Message is required!");
    } else {
      const toastGo = toast.loading("Message is sending...");
      fetch("https://formsubmit.co/ajax/timelytrigger@gmail.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: userEmail,
      number: phoneNumber,
      subject: subject,
      message: message,
      _template:"table"
    })
})
    .then(response => response.json())
    .then(data => {console.log(data);if(data.success){toast.success(
      `Your Messages has been sent Successfully!`,{
        id:toastGo
      })}
    })
    .catch(error => {console.log(error);toast.error("Message Sending Fail!",{id:toastGo});});
      setPhoneNumber("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };
  return (
    <section className="z-[20]" id="contact">
  <div className="py-8 lg:py-16 px-4 mx-auto w-full">
      <div className='flex flex-col justify-center items-center'>
        <SkillText title="Contact us" desc="Have questions? Want to explore our pricing options?" para="Get in touch with us"/>
      </div>
      <div className='flex flex-col lg:flex-row justify-center items-center gap-8 h-full w-full bg-[#0000009f] py-8 px-4'>
      <div className='w-full lg:w-[60%] order-2'>
      <form className="space-y-8" onSubmit={submitHandler}>
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)}
                    value={userEmail} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#0000009f] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@timelytrigger.com"/>
          </div>
          <div>
              <label htmlFor="pnumber" className="block mb-2 text-sm font-medium text-white dark:text-white">Phone Number</label>
              <input onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber} type="number" id="pnumber" className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#0000009f] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="+91234567890"/>
          </div>
          <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white dark:text-white">Subject</label>
              <input onChange={(e) => setSubject(e.target.value)}
                    value={subject} type="text" id="subject" className="block p-3 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-[#0000009f] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Subject"/>
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-white dark:text-white">Your message</label>
              <textarea onChange={(e) => setMessage(e.target.value)}
                    value={message} id="message" rows="6" className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-[#0000009f] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Let us know how we can help you"></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus:ring-primary-800">Send message</button>
      </form>
      </div>
  <div className='py-4 md:py-8 w-full lg:w-[30%] lg:order-1 h-full mt-0 lg:-mt-10  flex gap-10 lg:gap-10 flex-col items-start justify-start lg:flex-col lg:justify-start lg:items-start text-white'>
   <Image src="/Contact.gif" unoptimized={true} width={300} height={300} alt='Contact gif' className='mx-auto lg:mx-0' />
   <div className='flex flex-col gap-1 items-start justify-start'><span>📍Address</span><span>Vishnupuri, Indore</span></div>
   <div className='flex flex-col gap-1 items-start justify-start'><span>📲Phone No.</span><span>+919039002468</span></div>
   <div className='flex flex-col gap-1 items-start justify-start'><span>📩Email</span><span>timelytrigger@gmail.com</span></div>
  </div>
  </div>
</div>
</section>
  )
}

export default Contact