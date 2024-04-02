"use client"
import React from "react";
import LandingNavBar from "../components/LandingNavBar";
import Link from "next/link";
import {
  RiArrowRightDoubleFill,
} from "react-icons/ri";
const Home = () => {
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

        <div className="w-full h-full py-8 px-12">   
            <div className="w-full grid grid-cols-1 md:grid-cols-3 h-[20rem] mb-10">
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
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 mb-10 bg-zinc-700/75 rounded-lg shadow-xl cursor-pointer hover:bg-zinc-900 " style={{ transition: 'background-color 1.2s ease' }}>
                <div className="w-full pt-8 pl-6">
                    <h3 className="text-[35px] text-center text-white lg:text-left font-bold">This iasdiabs lkdfuasdas asdkh jasdk fhgasd</h3>
                </div>  
                <div className="w-full flex flex-col lg:flex-row px-4 my-4">
                    <div className="w-full flex flex-col">
                        <h4 className="text-[25px] text-gray-400 mb-5">Jasbhb asdijfuasd a aspfij de easudyg.</h4>
                        <p className="text-gray-200 text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                    </div>
                    <div className="w-full flex justify-center">
                        <img src="/image/computerPage2.png" alt="image" className="w-full h-full lg:w-[500px]" />
                    </div>
                </div>
                <div className="w-full flex gap-x-1 text-[19px] text-emerald-300 font-bold items-center pl-6 pb-6">
                    <span className="cursor-pointer flex hover:text-emerald-400 transition-colors">Why the Panda? <RiArrowRightDoubleFill className="text-[25px]"/></span>
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-7">
              <div className="w-full bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-900 shadow-xl" style={{ transition: 'background-color 1.2s ease' }}>
                  <div className="w-full py-8 px-6">
                      <h3 className="text-[35px] text-white text-left font-bold">This iasdiabs lkdf</h3>
                  </div> 
                  <div className="w-full px-6">
                      <p className="text-gray-200 text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                  </div>
              </div>
              <div className="w-full bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-900 shadow-xl containerDivChangeColor" style={{ transition: 'background-color 1.2s ease' }}>
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
            </div>
        </div>

      </div>
    </div>
  );
}
export default Home;