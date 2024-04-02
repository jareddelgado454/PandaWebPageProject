"use client"

import React, { useRef } from "react";
import LandingNavBar from "../components/LandingNavBar";
import Link from "next/link";
import { useScroll, motion, useTransform } from "framer-motion";
import {
  RiArrowRightDoubleFill,
} from "react-icons/ri";
const Home = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const { scrollYProgress:progress1 } = useScroll({
    target : ref,
    offset : ["0 1", "1.10 1"]
  });
  const { scrollYProgress:progress2 } = useScroll({
    target : ref2,
    offset : ["0 1", "1.05 1"]
  });
  const { scrollYProgress:progress3 } = useScroll({
    target : ref3,
    offset : ["0 1", "1.10 1"]
  });

  const scaleProgress1 = useTransform(progress1,[0, 1],[0.5, 1]);
  const scaleProgress2 = useTransform(progress2,[0, 1],[0.5, 1]);
  const scaleProgress3 = useTransform(progress3,[0, 1],[0.5, 1]);

  return (
    <div className="flex flex-col w-full p-0 bg-zinc-800">
      <div className="w-full h-full">
        <div className="w-full h-[750px] relative mb-10">
          <LandingNavBar />
          <div className="absolute top-[30%] lg:left-[20%] flex flex-col text-left z-30 px-4 lg:px-0">
              <h1 className=" text-[40px] text-left mb-1 text-white/90 font-extrabold ">
                <span className="text-emerald-400/90 md:text-3xl lg:text-[80px]">Getting</span>{" "}
                your car repaired
              </h1>
              <p className=" mb-7 text-left  text-[30px] text-white/90">
                Has never been{" "}
                <span className="text-emerald-400/90 font-extrabold md:text-3xl text-[40px]">
                  EASIER
                </span>
              </p>
              <p className="text-gray-100 md:text-xl lg:text-[22px] font-bold">Changing the auto repair industry by</p>
              <p className="text-gray-100 md:text-xl lg:text-[22px] font-bold mb-8">placing power in the small business owner`s hands.</p>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <Link href="/auth" className='w-full md:w-2/6 px-9 py-3 font-semibold border-[2px] rounded-lg text-white border-emerald-500 bg-emerald-500 text-[20px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                    Start here
                </Link>

                <Link href="/auth" className='w-full md:w-2/6 px-5 py-3 font-semibold border-[2px] rounded-lg text-emerald-300 border-emerald-500 bg-transparent text-[20px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                  Why the panda? 
                </Link>

              </div>
          </div>
          <div className="absolute w-full h-[750px] bg-gray-800 opacity-70"></div>
          <img
            className="w-full h-full object-cover"
            src="https://cdna.artstation.com/p/assets/images/images/040/174/900/large/fabian-geyer-wideshotright.jpg?1628083532"
          />
        </div>

        <div className="w-full h-full py-8 sm:px-12 px-5 flex flex-col justify-center items-center">   
            <motion.div ref={ref} style={{ scale : scaleProgress1, opacity : scaleProgress1 }} className="xl:w-[1200px] w-full grid grid-cols-1 md:grid-cols-3  mb-10 py-10">
                <div className="w-full text-center flex flex-col items-center justify-center py-8">
                    <h3 className="text-white font-bold text-[35px] w-full text-center">Tittle 1</h3>
                    <p className="text-[22px] text-gray-400 text-center">luaygfkuaygdflaisduf uasdfiasudhf asdlfiuash fliasduf  asdifuhpa.</p>
                </div>
                <div className="w-full text-center flex flex-col items-center justify-center py-8">
                    <h3 className="text-white font-bold text-[35px] w-full text-center">Tittle 1</h3>
                    <p className="text-[22px] text-gray-400 text-center">luaygfkuaygdflaisduf <span className="text-emerald-400 cursor-pointer font-bold">uasdfiasudhf</span> asdlfiuash fliasduf  asdifuhpa.</p>
                </div>
                <div className="w-full text-center flex flex-col items-center justify-center py-8">
                    <h3 className="text-white font-bold text-[35px] w-full text-center">Tittle 1</h3>
                    <p className="text-[22px] text-gray-400 text-center">luaygfkuaygdflaisduf uasdfiasudhf asdlfiuash fliasduf  asdifuhpa.</p>
                </div>
            </motion.div>

            <motion.div ref={ref2} style={{ scale : scaleProgress2, opacity : scaleProgress2, transition: 'background-color 1.2s ease' }} className="xl:w-[1200px] w-full flex flex-col mb-10 bg-zinc-700/75 rounded-lg shadow-xl cursor-pointer hover:bg-zinc-900 " >
                <div className="lg:w-1/2 w-full pt-8 sm:pl-10 pl-3">
                    <h3 className="text-[35px]  text-white text-left font-bold">This iasdiabs lkdfuasdas asdkh jasdk fhgasd</h3>
                </div>  
                <div className="w-full flex lg:flex-row flex-col px-3 my-4 ">
                    <div className="lg:flex-1 w-full flex flex-col  sm:px-6 px-0">
                        <h4 className="text-[25px] text-gray-400 mb-5">Jasbhb asdijfuasd a aspfij de easudyg.</h4>
                        <p className="text-gray-200 text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                    </div>
                    <div className=" lg:w-[40%] w-full flex justify-center ">
                        <img src="/image/computerPage2.png" alt="image" className=" top-0 w-[400px] md:w-[500px]" />
                    </div>
                </div>
                <div className="w-full flex gap-x-1 text-[19px] text-emerald-300 font-bold items-center sm:pl-10 pl-3 pb-6">
                    <span className="cursor-pointer flex hover:text-emerald-400 transition-colors">Why the Panda? <RiArrowRightDoubleFill className="text-[25px]"/></span>
                </div>
            </motion.div>

            <motion.div ref={ref3} style={{ scale : scaleProgress3, opacity : scaleProgress3 }} className="xl:w-[1200px] w-full flex lg:flex-row flex-col gap-7">
              <div className="lg:w-1/2 w-full bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-900 shadow-xl" style={{ transition: 'background-color 1.2s ease' }}>
                  <div className="w-full py-8 px-6">
                      <h3 className="text-[35px] text-white text-left font-bold">This iasdiabs lkdf</h3>
                  </div> 
                  <div className="w-full px-6">
                      <p className="text-gray-200 text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                  </div>
              </div>
              <div className="lg:w-1/2 w-full bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-900 shadow-xl containerDivChangeColor" style={{ transition: 'background-color 1.2s ease' }}>
                  <div className="w-full py-8 px-6">
                      <h3 className="text-[35px] text-white text-left font-bold">Uhsi asod sj auunwd</h3>
                  </div> 
                  <div className="w-full px-6 mb-6">
                      <p className="text-gray-200 text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                  </div>
                  <div className="w-full px-6 mb-6">
                      <div className="text-[40px] font-extrabold overflow-hidden divChangeColor">
                          <p className="m-0 p-0" style={{ lineHeight: '1', marginLeft: '-10px' }}><span className="changeColor">EPANDA</span>TECHNICIANSREPAIREDBUSINESSTHEPANDA<span className="changeColor">THEPANDA</span></p>
                          <p className="m-0 p-0" style={{ lineHeight: '1', marginLeft: '-10px' }}>ANSREPAIREDBUSINESS<span className="changeColor">THEPANDA</span>TECHNNICIANSREPAIR</p>
                          <p className="m-0 p-0" style={{ lineHeight: '1', marginLeft: '-10px' }}>NESS<span className="changeColor">THEPANDA</span>TECHNICIANSREPAIREDBUSINESSTECHNICI</p>
                          <p className="m-0 p-0" style={{ lineHeight: '1', marginLeft: '-10px' }}><span className="changeColor">THEPANDA</span>TECHNICIANSREPAIREDBUSINESSTHEPANDA</p>
                      </div>
                  </div>
              </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
}
export default Home;