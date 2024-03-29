import React from 'react'
import SkillText from '../sub/SkillText'

const Blogs = () => {
  return (
    <section className="z-[20] " id="blogs">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center mb-4 flex flex-col justify-center items-center">
          <SkillText title="Our Blogs" desc="Stay informed with our educational blogs" para="Check back regularly for fresh content!"/>
      </div> 
      <div className="grid gap-8 lg:grid-cols-2">
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md group dark:bg-[#0000009f] dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                      Tutorial
                  </span>
                  <span className="text-sm">21 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">How to quickly setup Timely Trigger</a></h2>
              <p className="mb-5 font-medium text-gray-500 group-hover:text-black dark:group-hover:text-white transition-all dark:text-gray-400">In this blog post, we’ll delve into the art of efficient timetable generation. Whether you’re a school administrator, teacher, or student, these tips will help you streamline your scheduling process.</p>
              <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                      <span className="font-medium dark:text-white">
                          Timely Trigger
                      </span>
                  </div>
                  <a href="/" className="inline-flex items-center font-medium text-primary-600 dark:text-white hover:underline">
                      Read more
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </a>
              </div>
          </article> 
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md group dark:bg-[#0000009f] dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                      Article
                  </span>
                  <span className="text-sm">14 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Enhancing Educational Experiences</a></h2>
              <p className="mb-5 font-medium text-gray-500 group-hover:text-black dark:group-hover:text-white transition-all">Timely Trigger isn’t just about timetables, it’s about enhancing the entire educational ecosystem. In this blog post, we’ll explore two powerful features: push notifications and live tracking. Let’s dive in!</p>
              <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                      <span className="font-medium dark:text-white">
                          Timely Trigger
                      </span>
                  </div>
                  <a href="/" className="inline-flex items-center font-medium text-primary-600 dark:text-white hover:underline">
                      Read more
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </a>
              </div>
          </article>                  
      </div>  
  </div>
</section>
  )
}

export default Blogs