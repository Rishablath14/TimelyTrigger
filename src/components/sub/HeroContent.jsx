"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8 md:gap-0 -mb-12 lg:mb-0 lg:flex-row items-center justify-center px-5 xl:px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Timely Trigger
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-3xl sm:text-5xl leading-[1.1] mb-[-20px] font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            The
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Ultimate{" "}
            </span>
            Automatic Timetable Generator
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-justify text-gray-300 my-5 max-w-[600px]"
        >
          Do you struggle with creating and managing timetables for your institute and want to enhance the scheduling and collaboration between your institute members? If you answered yes to any of these questions, then you need Timely Trigger.
        </motion.p>
      <div className="flex gap-12">
        <motion.a
          variants={slideInFromLeft(1)}
          className="p-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
          Learn More!
        </motion.a>
        <motion.a
          href="tel:+919039002468"
          variants={slideInFromLeft(1)}
          className="p-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
         Let’s try 👋
        </motion.a>
      </div>  
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/timecome.gif"
          alt="work icons"
          priority={true}
          className=""
          unoptimized={true}
          height={650}
          width={650}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
