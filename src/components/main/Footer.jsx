"use client"
import React from 'react'
import { Link } from 'react-scroll'
const Footer = () => {
  return (
    <footer className="p-4 md:p-8 lg:p-10 z-[20] relative">
  <div className="mx-auto max-w-screen-xl text-center">
      <p className="my-6 text-gray-500 dark:text-gray-400">We’re not just a software company, we’re your partners in efficient scheduling. </p>
      <ul className="flex flex-wrap justify-center text-xs  sm:text-lg items-center mb-6 text-white">
          <li>
              <Link activeClass="active"
        to="about-me"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500}
        className="mr-4 hover:underline md:mr-6 ">Home</Link>
          </li>
          <li>
              <Link activeClass="active"
        to="services"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500}
        className="mr-4 hover:underline md:mr-6">Services</Link>
          </li>
          <li>
              <Link activeClass="active"
        to="pricing"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500}
        className="mr-4 hover:underline md:mr-6 ">Pricing</Link>
          </li>
          <li>
              <Link activeClass="active"
        to="blogs"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500}
        className="mr-4 hover:underline md:mr-6">Blogs</Link>
          </li>
          <li>
              <Link activeClass="active"
        to="contact"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500}
        className="mr-4 hover:underline md:mr-6">Contact Us</Link>
          </li>
      </ul>
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">Timely Trigger™</a>. All Rights Reserved.</span>
  </div>
</footer>
  )
}

export default Footer