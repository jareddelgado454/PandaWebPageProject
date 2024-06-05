"use client"

import React, { use, useRef, useState } from "react";
import LandingNavBar from "../components/LandingNavBar";
import Link from "next/link";
import { useScroll, motion, useTransform } from "framer-motion";
import {
    RiArrowRightDoubleFill,
    RiVideoFill,
    RiCarFill,
    RiToolsFill,
    RiGraduationCapFill,
    RiCheckDoubleFill,
    RiStarFill,
    RiUserStarFill,
    RiLightbulbFill,
    RiAuctionFill,
    RiYoutubeFill,
    RiTwitterXFill,
    RiFacebookBoxFill,
    RiLinkedinBoxFill,
    RiDownloadFill,
} from "react-icons/ri";
import { PiCarProfileFill } from "react-icons/pi";
import DownloadApp from "@/components/modalLanding/DownloadApp";
import VideoModal from "@/components/modalLanding/VideoModal";
import { useDisclosure } from "@nextui-org/react";
import phoneMap2 from "../../public/image/phoneMap2.webp"
import Image from "next/image";
import car from "../../public/image/car.png"
import arrowTime from "../../public/image/arrowTime.png"
import logo from "../../public/panda.png"
import app from "../../public/image/app.png"
import technician from "../../public/image/technician.png"
import technician4 from "../../public/image/technician4.png"

const Home = () => {

    const {
        isOpen: isVideoModalOpen,
        onOpen: onVideoModalOpen,
        onOpenChange: onVideoModalOpenChange,
    } = useDisclosure();

    const {
        isOpen: isDownloadAppModalOpen,
        onOpen: onDownloadAppModalOpen,
        onOpenChange: onDownloadAppModalOpenChange,
    } = useDisclosure();


    const [modeApp, setModeApp] = useState("");

    const handleDownloadClick = (mode) => {
        setModeApp(mode);
        onDownloadAppModalOpen();
    }

    const ref = useRef(null);
    const refSecond = useRef(null);
    const refThird = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);

    const { scrollYProgress: progress1 } = useScroll({
        target: ref,
        offset: ["0 1", "1.10 1"]
    });
    const { scrollYProgress: progressSecond } = useScroll({
        target: refSecond,
        offset: ["0 1", "1.01 1"]
    })
    const { scrollYProgress: progressThird } = useScroll({
        target: refThird,
        offset: ["0 1", "1.01 1"]
    })
    const { scrollYProgress: progress2 } = useScroll({
        target: ref2,
        offset: ["0 1", "1.10 1.3"]
    });
    const { scrollYProgress: progress3 } = useScroll({
        target: ref3,
        offset: ["0 1", "1.10 1"]
    });
    const { scrollYProgress: progress4 } = useScroll({
        target: ref4,
        offset: ["0 1", "1.10 1"]
    });
    const { scrollYProgress: progress5 } = useScroll({
        target: ref5,
        offset: ["0 1", "1.10 1.5"]
    });
    const { scrollYProgress: progress6 } = useScroll({
        target: ref6,
        offset: ["0 1", "1.10 1.6"]
    });
    const { scrollYProgress: progress7 } = useScroll({
        target: ref7,
        offset: ["0 1", "1.10 1.8"]
    });

    const scaleProgress1 = useTransform(progress1, [0, 1], [0.5, 1]);
    const scaleProgressSecond = useTransform(progressSecond, [0, 1], [0.5, 1]);
    const scaleProgressThird = useTransform(progressThird, [0, 1], [0.5, 1]);
    const scaleProgress2 = useTransform(progress2, [0, 1], [0.7, 1]);
    const scaleProgress3 = useTransform(progress3, [0, 1], [0.5, 1]);
    const scaleProgress4 = useTransform(progress4, [0, 1], [0.5, 1]);
    const scaleProgress5 = useTransform(progress5, [0, 1], [0.5, 1]);
    const scaleProgress6 = useTransform(progress6, [0, 1], [0.5, 1]);
    const scaleProgress7 = useTransform(progress7, [0, 1], [0.5, 1]);

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
    
                  <button onClick={onVideoModalOpen} className='md:w-1/2 w-full flex justify-center items-center gap-x-2 px-5 py-3 font-semibold border-[2px] rounded-xl text-zinc-900 border-gray-100 bg-gray-100  text-[20px] hover:bg-gray-300 hover:border-gray-300 hover:text-zinc-950 transition delay-50'>
                    <RiVideoFill className="text-[20px]"/>
                    Watch Video
                  </button>
            </div> 
          </div>
          <div className="absolute w-full h-[750px] bg-gray-800 opacity-70"></div>
          <img
            className="w-full h-full object-cover"
            src="https://cdna.artstation.com/p/assets/images/images/040/174/900/large/fabian-geyer-wideshotright.jpg?1628083532"
          />
        </div>

        <div className="w-full h-full py-8 sm:px-12 px-5 flex flex-col justify-center items-center shadow-xl">  
            <div className="xl:w-[1200px] w-full relative mb-10">
                <div className="absolute flex justify-center top-[35%] w-1/2 md:left-6 left-3 rounded-full">
                    <div className=" lg:w-2/3 w-full h-full rounded-xl font-extrabold  lg:text-[40px] md:text-[30px] text-[20px]  text-white py-10 lg:px-7 md:px-4 px-1">
                        SAVE TIME AND MONEY
                    </div>
                </div>
                <div className="absolute w-1/2 flex justify-center items-center top-[50px] right-4">
                    <Image 
                        alt='PhoneWireFrame'
                        src={phoneMap2}
                        placeholder='blur'
                        quality={100}
                        sizes='100vw'
                        className="lg:w-[320px] md:w-[250px] w-[200px]  object-cover"
                    />
                </div>
                <div className="xl:w-[1200px] w-full rounded-2xl overflow-hidden">
                    <div className="w-full flex items-center h-[40px] bg-emerald-400">
                      <div className="flex gap-x-2 pl-4">
                          <div className="w-[10px] h-[10px] rounded-full bg-red-600"></div>
                          <div className="w-[10px] h-[10px] rounded-full bg-yellow-500"></div>
                          <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1 text-white text-center text-[17px] font-semibold">
                          wwww
                      </div>
                      <div className="flex gap-x-2 items-center pr-3">
                          <div className="w-[60px] h-[8px] rounded-2xl bg-white"></div>
                          <div className="w-[40px] h-[8px] rounded-2xl bg-emerald-100"></div>
                      </div>
                    </div>
                    <div className="w-full flex lg:h-[500px] md:h-[400px] h-[300px] bg-zinc-600">
                      <div className="w-[20%] flex flex-col h-full bg-zinc-800 pt-6 px-2">
                          <div className="h-[20px] w-full flex gap-x-2 mb-8">
                              <div className="bg-zinc-600 h-full w-1/3 rounded-md"></div>
                              <div className="bg-zinc-600 h-full flex-1 rounded-md"></div>
                          </div>
                          <div className="h-[80px] w-full flex flex-col justify-center items-center mb-8 px-2">
                              <div className="bg-zinc-600 h-[60px] w-[60px] rounded-md mb-2"></div>
                              <div className="bg-zinc-600 h-[20px] md:w-1/2 w-full rounded-md "></div>
                          </div>
                          <div className=" w-full flex flex-col md:px-3 px-1">
                              <div className="bg-zinc-600 md:h-[120px] h-[70px] w-full rounded-lg mb-4"></div>
                          </div>
                          <div className=" w-full flex flex-col md:px-3 px-1">
                              <div className="bg-zinc-600 h-[30px] w-full rounded-lg mb-4"></div>
                          </div>
                      </div>
                      <div className="w-[80%] h-full bg-zinc-700 overflow-hidden">
                        <div className="w-full h-1/3 flex justify-between md:py-4 py-2 md:px-6 px-2 gap-x-2">
                            <div className="w-1/3 bg-zinc-800 h-full rounded-xl"></div>
                            <div className="w-1/3 bg-zinc-800 h-full rounded-xl"></div>
                            <div className="w-1/3 bg-zinc-800 h-full rounded-xl"></div>
                        </div>
                        <div className="w-full h-[35px] flex md:px-6 px-2 mb-2">
                            <div className="w-1/2 bg-zinc-800 h-full rounded-xl"></div>
                        </div>
                        <div className="w-full h-[90px] flex md:px-6 px-2 mb-3">
                            <div className="w-full bg-zinc-800 h-full rounded-xl"></div>
                        </div>
                        <div className="w-full h-1/3 flex justify-between md:py-4 py-2 md:px-6 px-2 gap-x-2">
                            <div className="w-1/2 bg-zinc-800 h-full rounded-xl"></div>
                            <div className="w-1/2 bg-zinc-800 h-full rounded-xl"></div>
                        </div>
                      </div>
                    </div>
                </div>
            </div> 
            <div className="xl:w-[1200px] w-full grid grid-cols-1 md:grid-cols-3  mb-10 py-10">
                <motion.div ref={ref} style={{ scale : scaleProgress1, opacity : scaleProgress1 }} className="w-full text-center flex flex-col items-center justify-center py-8 pr-3">
                    <div className="w-[45px] h-[45px] rounded-full bg-white flex justify-center items-center mb-2">
                        <RiGraduationCapFill  className="w-full text-zinc-700 text-[30px]"/>
                    </div>
                    <h3 className="text-white font-bold text-[35px] w-full text-center">TRAINING</h3>
                    <p className="text-[22px] text-gray-300 text-center">Dreaming on a <span className="text-emerald-400 cursor-pointer font-bold">career</span> in auto repair? Empowarement through technology and support.</p>
                </motion.div>
                <motion.div ref={refSecond} style={{ scale : scaleProgressSecond, opacity : scaleProgressSecond }} className="w-full text-center flex flex-col items-center justify-center py-8 px-3">
                    <div className="w-[45px] h-[45px] rounded-full bg-white flex justify-center items-center mb-2">
                        <RiCarFill className="w-full text-zinc-700 text-[30px]"/>
                    </div>
                    <h3 className="text-white font-bold text-[35px] w-full text-center">REPAIR</h3>
                    <p className="text-[22px] text-gray-300 text-center">Find the <span className="text-emerald-400 cursor-pointer font-bold">nearest</span> skilled technician to come and repair your car, saving time and Money</p>
                </motion.div>
                <motion.div ref={refThird} style={{ scale : scaleProgressThird, opacity : scaleProgressThird }} className="w-full text-center flex flex-col items-center justify-center py-8 pl-3">
                    <div className="w-[45px] h-[45px] rounded-full bg-white flex justify-center items-center mb-2">
                        <RiToolsFill className="w-full text-zinc-700 text-[30px]"/>
                    </div>
                    <h3 className="text-white font-bold text-[35px] w-full text-center">TECHNICIANS</h3>
                    <p className="text-[22px] text-gray-300 text-center">The app streamlines the <span className="text-emerald-400 cursor-pointer font-bold">entire process</span>. From service requests to tracking appointments</p>
                </motion.div>
            </div>

            <motion.div ref={ref2} style={{ scale : scaleProgress2, opacity : scaleProgress2, transition: "background-color 1.2s ease" }} className="xl:w-[1200px] w-full flex flex-col mb-10 bg-zinc-800 rounded-3xl shadow-2xl shadow-gray-600/50 cursor-pointer hover:bg-zinc-900 " >
                <div className="lg:w-1/2 w-full pt-8 sm:pl-10 pl-5">
                    <h3 className="sm:text-[35px] text-[30px]  text-white text-left font-bold">Family <span className="text-emerald-400">Legacy</span>, Business Vision</h3>
                </div>  
                <div className="w-full flex lg:flex-row flex-col px-3 my-4  mb-10">
                    <div className="lg:flex-1 w-full flex flex-col  sm:px-6 px-2">
                        <h4 className="sm:text-[25px] text-[20px] text-gray-400 mb-5">The Panda is a mobile auto repair service CRM</h4>
                        <p className="text-gray-200 sm:text-[20px] text-[17px] text-justify">Our founders have a long family history in the auto industry and a deep empathy for small business owners and barriers to success. We combined those two areas that we are highly passionate about and came to this wonderful conclusion. We care deeply about people and strongly believe that our experiences and expertise can help to empower people.</p>
                    </div>
                    <div className=" lg:w-[40%] w-full flex justify-center ">
                        <Image 
                            alt='Car'
                            src={car}
                            placeholder='blur'
                            quality={100}
                            sizes='100vw'
                            className=" top-0 w-600 md:w-[400px]"
                        />
                    </div>
                </div>
                <div className="w-full flex gap-x-1 text-[19px] text-emerald-300 font-bold items-center sm:pl-10 pl-5 pb-6 pt-4">
                    <span className="cursor-pointer flex hover:text-emerald-400 transition-colors">Why the Panda? <RiArrowRightDoubleFill className="text-[25px]"/></span>
                </div>
            </motion.div>

            <div className="xl:w-[1200px] w-full flex lg:flex-row flex-col gap-7 mb-20">
              <motion.div ref={ref3} className="lg:w-1/2 w-full bg-zinc-800 rounded-3xl cursor-pointer hover:bg-zinc-900 shadow-2xl shadow-gray-600/50 containerDivChangeColor" style={{ transition: 'background-color 1.2s ease',scale : scaleProgress3, opacity : scaleProgress3 }}>
                  <div className="w-full py-8 px-6">
                      <h3 className="sm:text-[35px] text-[30px] text-white text-left font-bold">Our <span className="text-emerald-400">MISSION</span></h3>
                  </div> 
                  <div className="w-full px-6 mb-6">
                      <p className="text-gray-200 text-[18px]">{"We provide a source of economic power for mobile mechanics. Our goal is to be the best customer relationship management tool any mobile mechanic could need. we focus on customer acquisition and retention so you don't have to."}</p>
                  </div>
                  <div className="w-full px-6 mb-6">
                      <div className="text-[40px] font-extrabold overflow-hidden divChangeColor">
                          <p className="m-0 p-0" style={{ lineHeight: "1", marginLeft: "-10px" }}><span className="changeColor">EPANDA</span>TECHNICIANSREPAIREDBUSINESSTHEPANDA<span className="changeColor">THEPANDA</span></p>
                          <p className="m-0 p-0" style={{ lineHeight: "1", marginLeft: "-10px" }}>ANSREPAIREDBUSINESS<span className="changeColor">THEPANDA</span>TECHNNICIANSREPAIR</p>
                          <p className="m-0 p-0" style={{ lineHeight: "1", marginLeft: "-10px" }}>NESS<span className="changeColor">THEPANDA</span>TECHNICIANSREPAIREDBUSINESSTECHNICI</p>
                          <p className="m-0 p-0" style={{ lineHeight: "1", marginLeft: "-10px" }}><span className="changeColor">THEPANDA</span>TECHNICIANSREPAIREDBUSINESSTHEPANDA</p>
                      </div>
                  </div>
              </motion.div>
              <motion.div ref={ref4} className="lg:w-1/2 w-full bg-zinc-800 rounded-3xl hover:bg-zinc-900 shadow-2xl shadow-gray-600/50 pb-6" style={{ transition: 'background-color 1.2s ease', scale : scaleProgress4, opacity : scaleProgress4 }}>
                  <div className="w-full py-8 px-6">
                      <h3 className="sm:text-[35px] text-[30px] text-white text-left font-bold">Where we are <span className="text-emerald-400">TODAY</span></h3>
                  </div> 
                  <div className="w-full px-6 mb-10 ">
                    <div className="flex gap-x-2 mb-1">
                        <RiCheckDoubleFill  className="text-emerald-400 text-[30px] min-w-[30px] "/>
                        <p className="text-gray-200 text-[20px]">AWS Build Accelerator 2023 cohort.</p>
                    </div>
                    <div className="flex gap-x-2 mb-1">
                        <RiCheckDoubleFill  className="text-emerald-400 text-[30px] min-w-[30px]  "/>
                        <p className="text-gray-200 text-[20px]">Featured in AWS Startup <a className="text-emerald-300 font-extrabold cursor-pointer hover:text-emerald-500 hover:underline transition-colors" href={'https://aws.amazon.com/startups/showcase/startup-details/09e92340-980f-4904-9c57-2c032416ed06'} target="_blank" rel="noopener noreferrer">ShowCase.</a></p>
                    </div>
                    <div className="flex gap-x-2 mb-1">
                        <RiCheckDoubleFill  className="text-emerald-400 text-[30px] min-w-[30px]  "/>
                        <p className="text-gray-200 text-[20px]">MVP <a className="text-emerald-300 font-extrabold cursor-pointer hover:text-emerald-500 hover:underline transition-colors" href={'https://play.google.com/store/apps/details?id=com.techethio.panda'} target="_blank" rel="noopener noreferrer">Customers</a> and <a href={'https://play.google.com/store/apps/details?id=com.panda.technician'} className="text-emerald-300 font-extrabold cursor-pointer hover:text-emerald-500 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Technicians</a> apps available on the Google Play store</p>
                    </div>
                    <div className="flex gap-x-2 mb-1">
                        <RiCheckDoubleFill  className="text-emerald-400 text-[30px] min-w-[30px]  "/>
                        <p className="text-gray-200 text-[20px]">MVP <a href={'https://apps.apple.com/us/app/panda-customer/id1670849690?ign-itscg=30200&ign-itsct=apps_box_link'} className="text-emerald-300 font-extrabold cursor-pointer hover:text-emerald-500 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Customers</a> and <a href={'https://apps.apple.com/us/app/panda-technician/id1670848100?ign-itscg=30200&ign-itsct=apps_box_promote_link'} className="text-emerald-300 font-extrabold cursor-pointer hover:text-emerald-500 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Technicians</a> apps available on the Google App store</p>
                    </div>
                    <div className="flex gap-x-2 mb-1">
                        <RiCheckDoubleFill  className="text-emerald-400 text-[30px] min-w-[30px]  "/>
                        <p className="text-gray-200 text-[20px]">Partnership with Nvidia Inception program to create Generative AI solutions.</p>
                    </div>
                  </div>
                  <div className="relative px-6 pt-4 ">
                    <div className="absolute top-0 lg:left-[100px] left-[20%] p-0">
                        <PiCarProfileFill  className="text-[45px] text-emerald-400"/>
                    </div>
                    <Image 
                        alt='arrowTime'
                        src={arrowTime}
                        placeholder="blur"
                        quality={100}
                        sizes="100vw"
                        className="w-full"
                    />
                  </div>                
              </motion.div>
            </div>

            <motion.div ref={ref5} style={{ scale : scaleProgress5, opacity : scaleProgress5 }} className="xl:w-[1200px] w-full relative mb-20">
                <h3 className="w-full px-2 text-gray-200 md:text-[50px] text-[30px] font-bold  mb-5">We are constantly <span className="font-extrabold text-white">Improving</span> to give you the best experience</h3>
                <div className="bg-zinc-800 hover:bg-zinc-900 rounded-3xl w-full flex lg:flex-row flex-col shadow-xl shadow-gray-600/50" style={{ transition: "background-color 1.2s ease" }}>
                    <div className="lg:w-[50%] w-full flex flex-col p-8">
                        <div className="flex gap-x-3 mb-5">
                            <div className="rounded-3xl w-[80px] h-[80px] overflow-hidden bg-white">
                                <Image 
                                    alt="logo"
                                    src={logo}
                                    placeholder="blur"
                                    quality={100}
                                    sizes="100vw"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col ">
                                <h4 className="text-white h-[40px] text-[20px] font-light">The Panda App</h4>
                                <div className="flex gap-x-1">
                                    <RiStarFill className="text-yellow-400 text-[30px]"/>
                                    <RiStarFill className="text-yellow-400 text-[30px]"/>
                                    <RiStarFill className="text-yellow-400 text-[30px]"/>
                                    <RiStarFill className="text-yellow-400 text-[30px]"/>
                                    <RiStarFill className="text-yellow-400 text-[30px]"/>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-[50px] text-white font-bold mb-2">Mobile App</h2>
                        <p className="text-[20px] text-gray-200 mb-8">Freedom of choice and price – an app to find the best option to repair your car.</p>
                        <div className="flex lg:flex-row flex-col gap-2">
                            <button onClick={()=>handleDownloadClick("customer")} className="flex items-center justify-center lg:w-1/2 w-full py-3 rounded-2xl bg-emerald-300 hover:bg-emerald-400 transition-colors text-[18px] font-bold cursor-pointer">
                                <RiDownloadFill  className="text-[22px]"/>
                                Customers app
                            </button>
                            <button onClick={()=>handleDownloadClick("technician")} className="flex items-center justify-center lg:w-1/2 w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-300 hover:text-zinc-900 text-zinc-900 transition-colors text-[18px] font-bold cursor-pointer">
                                <RiDownloadFill  className="text-[22px]"/>
                                Technicians app
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-[50%] w-full flex flex-col justify-center items-center">
                        <Image 
                            alt="app"
                            src={app}
                            placeholder="blur"
                            quality={100}
                            sizes="100vw"
                            className="sm:w-[400px] w-[300px] h-full object-cover"
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div ref={ref6} style={{ scale : scaleProgress6, opacity : scaleProgress6 }} className="xl:w-[1200px] bg-zinc-800 rounded-3xl w-full mb-20 md:p-10 p-3">
                <div className="w-full rounded-3xl relative overflow-hidden mb-8">
                    <div className="absolute -bottom-2 -left-2  text-[35px] text-white rounded-lg  font-bold bg-zinc-800 px-5 py-3 shadow-xl">
                        TECHNICIANS
                    </div>
                    <Image 
                        alt="technicians"
                        src={technician4}
                        placeholder="blur"
                        quality={100}
                        sizes="100vw"
                        className="w-full sm:h-[500px] h-[300px] object-cover"
                    />
                </div>
                <div className="flex lg:flex-row flex-col">
                    <div className="lg:w-1/2 w-full pr-4 lg:mb-0 mb-4">
                        <p className="text-[22px] text-gray-200"><span className="text-emerald-400 font-bold">Increase</span> the amount of your repair services, maximizing profits over time, making your <span className="text-emerald-400 font-bold">work</span> more effective</p>
                    </div>
                    <div className="lg:w-1/2 w-full flex lg:flex-row flex-row-reverse items-center bg-zinc-700 rounded-3xl p-2">
                        <div className="lg:w-[60%] w-full p-4">
                            <h3 className="text-white font-bold text-[25px]">Skilled Technician</h3>
                            <p className="text-gray-300 mb-3">Start enjoying all the benefits of being a registered technician at The Panda</p>
                            <Link href={"/auth/signup"} className="bg-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors p-3 w-full rounded-lg md:text-[18px] text-[16px] font-semibold">Create an account</Link>
                        </div>
                        <div className="lg:w-[40%] sm:w-[200px] w-[150px] p-3">
                            <Image 
                                alt="technician"
                                src={technician}
                                placeholder="blur"
                                quality={100}
                                sizes="100vw"
                                className="w-full"
                            /> 
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="xl:w-[1200px] w-full relative mb-40">
                <h3  className="w-full px-2 text-gray-200 md:text-[50px] text-[30px] font-bold mb-5">People stay with us because</h3>
                <div className="w-full flex lg:flex-row flex-col gap-4" >
                    <div className="lg:w-1/3 w-full flex p-6 py-8 flex-col  bg-zinc-800 hover:bg-zinc-900 rounded-3xl shadow-xl shadow-gray-600/50 " style={{ transition: "background-color 1.2s ease" }}>
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center mb-3">
                            <RiLightbulbFill  className="w-full text-zinc-700 text-[30px]"/>
                        </div>
                        <h3 className="text-white font-bold text-[30px] w-full mb-3">The process is fast and transparent</h3>
                        <p className="text-[22px] text-gray-300 ">People get in touch directly, without intermediaries, and <span className="text-emerald-400 font-bold">quickly</span> discuss details</p> 
                    </div>
                    <div  className="lg:w-1/3 w-full flex p-6 py-8 flex-col  bg-zinc-800 hover:bg-zinc-900 rounded-3xl shadow-xl shadow-gray-600/50 " style={{ transition: "background-color 1.2s ease" }}>
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center mb-3">
                            <RiUserStarFill  className="w-full text-zinc-700 text-[30px]"/>
                        </div>
                        <h3 className="text-white font-bold text-[30px] w-full mb-3">Our specialists are verified</h3>
                        <p className="text-[22px] text-gray-300 ">Technicians go through a complete <span className="text-emerald-400 font-bold">verification</span> process and accredit their skills, to ensure the best possible service</p> 
                    </div>
                    <div  className="lg:w-1/3 w-full flex p-6 py-8 flex-col  bg-zinc-800 hover:bg-zinc-900 rounded-3xl shadow-xl shadow-gray-600/50 " style={{ transition: 'background-color 1.2s ease'}}>
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex justify-center items-center mb-3">
                            <RiAuctionFill  className="w-full text-zinc-700 text-[30px]"/>
                        </div>
                        <h3 className="text-white font-bold text-[30px] w-full mb-3">Fair prices</h3>
                        <p className="text-[22px] text-gray-300 ">The price will be appropriate so that it is win-win for both parties. Fair pay inspires <span className="text-emerald-400 font-bold">quality</span> work</p> 
                    </div>
                </div>
            </div>

            <footer className="flex flex-col xl:w-[1200px] w-full">
                <div className="w-full flex md:flex-row flex-col md:justify-between justify-center items-center border-b-[1px] border-b-gray-500 pb-5">
                    <div className="flex items-center gap-x-1">
                        <img src="/panda.png" alt="logo" className="w-[85px] h-[70px]"/>
                        <h2 className="text-[25px] text-white font-bold">The Panda</h2>
                    </div>
                    <div className="flex flex-col lg:items-end items-center">
                        <p className="text-white text-[17px]">contact@panda-mars.com</p>
                        <p className="text-white text-[17px]"> 7600 Chevy Chase Dr, Austin, TX 78752</p>
                    </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col pt-8 border-b-[1px] border-b-gray-500 pb-5">
                    <div className="lg:w-1/5 w-full flex flex-col">
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer lg:text-[17px] text-[19px] hover:text-emerald-300">WHY THE PANDA?</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Summary</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Mission</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Where we are today</p>
                    </div>
                    <div className="lg:w-1/5 w-full flex flex-col">
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">SERVICES</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Training</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Get repaired your car</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Technicians</p>
                    </div>
                    <div className="lg:w-1/5 w-full flex flex-col">
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">SECURITY</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Verification</p>
                    </div>
                    <div className="lg:w-1/5 w-full flex flex-col">
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">ABOUT US</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Company information</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Meet our team</p>
                    </div>
                    <div className="lg:w-1/5 w-full flex flex-col">
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">SUPPORT</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">Contact us</p>
                        <p className="text-gray-100 mb-2 cursor-pointer lg:block hidden hover:text-emerald-300">FAQ</p>
                    </div>
                </div>
                <div className="w-full flex lg:flex-row flex-col justify-between pt-8 border-b-[1px] border-b-gray-500 pb-5">
                    <div className="flex lg:flex-row flex-col lg:items-center items-start gap-x-5">
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">Terms and conditions</p>
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">Privacy Policy</p>
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">Cookies Policy</p>
                        <p className="font-bold text-white lg:mb-2 mb-3 cursor-pointer hover:text-emerald-300">Refund Policy</p>
                    </div>
                    <div className="flex items-center gap-x-5">
                        <RiYoutubeFill className="text-white text-[30px] cursor-pointer hover:text-emerald-300 transition-colors"/>
                        <RiTwitterXFill  className="text-white text-[30px] cursor-pointer hover:text-emerald-300 transition-colors"/>
                        <RiFacebookBoxFill  className="text-white text-[30px] cursor-pointer hover:text-emerald-300 transition-colors"/>
                        <RiLinkedinBoxFill  className="text-white text-[30px] cursor-pointer hover:text-emerald-300 transition-colors"/>
                    </div>
                </div>
                <div className="w-full text-white text-center py-4">
                    © 2024 The Panda M.A.R.S. LLC. All rights reserved.
                </div>
            </footer>
        </div>

      </div>
      <DownloadApp isOpen={isDownloadAppModalOpen} onOpenChange={onDownloadAppModalOpenChange} mode={modeApp}/>
      <VideoModal isOpen={isVideoModalOpen} onOpenChange={onVideoModalOpenChange} mode={modeApp}/>
    </div >
  );
}
export default Home;