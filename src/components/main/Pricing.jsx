"use client"
import {useAuth} from '@clerk/nextjs';
import {loadStripe} from "@stripe/stripe-js";
import SkillText from '../sub/SkillText'
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Pricing = () => {
    const [loading,setLoading] = useState(false);
    const {isSignedIn,userId} = useAuth();
    const [userPur,setUserPur] = useState([]);
    useEffect(()=>{
        if(userId){
        const getData= async()=>{
            const res = await fetch('/api/users');
            const data = await res.json();
            console.log(data.publicMetadata);
            setUserPur(data.publicMetadata)
        }
            getData();
        
        }
    },[])
    const handlePricing = async(num)=>{
      if(!isSignedIn){toast.error("Please Login to Continue!");}
      else{
      try{  
        setLoading(true);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) throw new Error('Stripe failed to initialize.');
      const planid = num==3 ? 'price_1OtVCpSByltqYxNxm3Tp8YNw': num==2 ? 'price_1OwNJcSByltqYxNxPnzwWTge' : 'price_1OwNHkSByltqYxNxeMjgsdjL';
      const session = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  subsId:num,  
                  planId: planid, // Replace with your actual plan ID
                  id: userId, // Pass the user ID for metadata
                  successUrl: 'https://timelytrigger.netlify.app/dashboard', // Adjust URL for your deployment
                  cancelUrl: 'https://timelytrigger.netlify.app/checkout/cancel', // Adjust URL for your deployment
            })})

            const {sessionId} = await session.json();
            const stripeError = await stripe.redirectToCheckout({sessionId});

            if (stripeError) {
                console.error(stripeError);
            }
        } catch (error) {
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }}
  return (
<section className="dark:bg-dark -mt-6 z-[20]" id="pricing">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-4 flex flex-col items-center justify-center">
      <SkillText title="Our Pricing" desc="Our pricing is straightforward, ensuring you get the best value for your investment." para="Let&apos;s Get Started"/>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg dark:border-gray-600 xl:p-8 dark:bg-[#0000009f] dark:text-white shadow-2 hover:shadow-lg">
              <h3 className="mb-4 text-2xl font-semibold">Basic Plan</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best functional option for Small &nbsp; Institutions</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$49</span>
                  <span className="text-gray-500 dark:text-gray-400">/ year</span>
              </div>

              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Automatic Timetable Generation</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Basic Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Team size: <span className="font-semibold">1 developer</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Premium support: <span className="font-semibold">6 months</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Free updates: <span className="font-semibold">6 months</span></span>
                  </li>
              </ul>
              <button onClick={()=>handlePricing(1)} disabled={loading || userPur.subscriber?true:false} className={cn("text-white bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900", userPur.subscriber && "bg-green-700 hover:bg-green-900" )}>{userPur.subscriber?"Purchased":"Get started"}</button>
          </div>
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg dark:border-gray-600 xl:p-8 dark:bg-[#0000009f] dark:text-white shadow-2 hover:shadow-lg">
              <h3 className="mb-4 text-2xl font-semibold">Premium Plan</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Enhanced Features for Growing Institutions</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$99</span>
                  <span className="text-gray-500 dark:text-gray-400">/ year</span>
              </div>

              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>All Basic Plan features</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Priority Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Customization Options</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Notification Feature Unlocked</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Team size: <span className="font-semibold">10 developers</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Premium support: <span className="font-semibold">24 months</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Free updates: <span className="font-semibold">24 months</span></span>
                  </li>
              </ul>
              <button onClick={()=>handlePricing(2)} disabled={loading || userPur.subsId>1?true:false} className={cn("text-white bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900", userPur.subsId>1 && "bg-green-700 hover:bg-green-900" )}>{userPur.subsId>1?"Purchased":userPur.subscriber?"Upgrade":"Get started"}</button>
          </div>
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg dark:border-gray-600 xl:p-8 dark:bg-[#0000009f] dark:text-white shadow-2 hover:shadow-lg">
              <h3 className="mb-4 text-2xl font-semibold">Enterprise Plan</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Tailored Solutions for Large Universities and Colleges</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$149</span>
                  <span className="text-gray-500 dark:text-gray-400">/ year</span>
              </div>

              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>All Premium Plan features</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>24X7 Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Advance Customizations</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Live Tracking Feature Unlocked</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>API access</span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Team size: <span className="font-semibold">100+ developers</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
        
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Premium support: <span className="font-semibold">36 months</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Free updates: <span className="font-semibold">36 months</span></span>
                  </li>
              </ul>
              <button onClick={()=>handlePricing(3)} disabled={loading || userPur.subsId>2?true:false} className={cn("text-white bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900", userPur.subsId>2 && "bg-green-700 hover:bg-green-900" )}>{userPur.subsId>2?"Purchased":userPur.subscriber?"Upgrade":"Get started"}</button>
          </div>
      </div>
  </div>
</section>
  )
}

export default Pricing