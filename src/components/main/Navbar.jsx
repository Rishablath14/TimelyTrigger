"use client";
import { UserButton, SignedOut, SignInButton,useAuth} from "@clerk/nextjs";
import Image from "next/image";
import { Link } from "react-scroll";
import React, { useState} from "react";

const Navbar = () => {
  const{isSignedIn} = useAuth();
  const DotIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    );
  };
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#030014a2] lg:bg-[#03001417] backdrop-blur-md z-50 px-2 md:px-12">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a href="/"
        className="h-auto w-auto flex flex-row items-center pb-2">
          <Image
            src="/TTlogo.png"
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer hover:animate-slowspin w-10 h-10 lg:w-[50px] lg:h-[50px]"
          />
          <span className="font-bold ml-[10px] block text-gray-300 mt-2 lg:text-xl xl:text-2xl text-lg">
            Timely Trigger
          </span>
        </a>
        <div className="lg:hidden order-2">
          {open ? (
            <button
              className="text-white text-2xl bg-[#0300145e] rounded-md px-2"
              onClick={handleMenu}
            >
              &#9747;
            </button>
          ) : (
            <button
              className="text-white text-2xl bg-[#0300145e] rounded-md px-2"
              onClick={handleMenu}
            >
              &#9776;
            </button>
          )}
        </div>
        <div
          className={`w-full ${isSignedIn && "lg:mr-[8vw] xl:mr-[10vw]"} lg:w-[500px] h-full left-0 absolute block lg:relative lg:flex lg:flex-row lg:items-center lg:justify-between lg:translate-y-0 transition-all ${
            open
              ? "opacity-100 block translate-y-16"
              : "opacity-0 hidden translate-y-0"
          } lg:opacity-100`}
        >
          <div className="flex flex-col gap-14 lg:gap-0 lg:mt-0 lg:flex-row items-center justify-between w-full h-auto border bg-[#030014fa] border-[#7042f861] lg:bg-[#0300145e] px-[20px] py-[30px] lg:py-[10px] lg:rounded-full text-gray-200">
            <Link  activeClass="active"
        to="about-me"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500} onClick={handleMenu} className="cursor-pointer lg:border-r-[1px] border-white lg:pr-6">
              Home
            </Link>
            {/* <Link  href="#about-me" onClick={handleMenu} className="cursor-pointer lg:border-r-[1px] border-white lg:pr-6">
              About Us
            </Link> */}
            <Link  activeClass="active"
        to="services"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500} onClick={handleMenu} className="cursor-pointer lg:border-r-[1px] border-white lg:pr-6">
              Services
            </Link>
            <Link  activeClass="active"
        to="pricing"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500} onClick={handleMenu} className="cursor-pointer lg:border-r-[1px] border-white lg:pr-6">
              Pricing
            </Link>
            <Link  activeClass="active"
        to="blogs"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500} onClick={handleMenu} className="cursor-pointer lg:border-r-[1px] border-white lg:pr-6">
              Blogs
            </Link>
            <Link  activeClass="active"
        to="contact"
        spy={true}
        smooth={true}
        offset={-20}
        duration={500} onClick={handleMenu} className="cursor-pointer">
              Contact Us
            </Link>

            <SignedOut>
            <SignInButton mode="modal">
              <div className="lg:hidden flex flex-row gap-5 py-2 px-3 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]">
                Login/Signup
              </div>
             </SignInButton> 
            </SignedOut>
          </div>
        </div>
        {isSignedIn
        ?
          <UserButton afterSignOutUrl="/">
            <UserButton.UserProfileLink
              label="Dashboard"
              url="/dashboard"
              labelIcon={<DotIcon />}
            />
          </UserButton>
        :  
          <SignInButton mode="modal">
            <div className="hidden lg:flex lg:mr-[4vw] flex-row gap-5 py-2 px-3 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]">
              Login/Signup
            </div>
          </SignInButton>
}
      </div>
    </div>
  );
};

export default Navbar;
