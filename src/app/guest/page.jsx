"use client"

import Link from 'next/link';
import React from 'react';
import { FaCamera } from "react-icons/fa6";

const Guest = () => {
  return (
    <div className="w-full h-screen relative">
        <img
            src="https://autenticos4x4.com/wp-content/uploads/2019/03/taller-mecanico-reparacion-vehiculos.jpg"
            alt="background_user"
            className="absolute w-full h-full object-cover bg-center"
            loading="eager"
        />
        <div className="absolute w-full h-full bg-zinc-900 opacity-80" />
        <div className="absolute w-full h-full flex flex-col md:flex-row justify-center items-center gap-10 px-4 md:px-0 py-4 md:py-0">
            <div className="w-full overflow-y-auto md:w-2/4 flex flex-col bg-zinc-700 text-white rounded-lg shadow-lg p-4 h-3/4 relative order-1">
                <div className="bg-zinc-800 h-[40px] w-[600px] flex rounded-xl mb-3">
                     <div className="w-1/3 rounded-xl text-center hover:bg-gray-400 flex items-center justify-center transition-colors duration-75 cursor-pointer">
                        News & Releases
                     </div>
                     <div className="w-1/3 rounded-xl text-center hover:bg-gray-400 flex items-center justify-center transition-colors duration-75 cursor-pointer">
                        Technicians
                      </div>
                      <div onClick={()=> requestPrices()} className="w-1/3 rounded-xl text-center hover:bg-gray-400 flex items-center duration-75 justify-center transition-colors cursor-pointer">
                        Subscriptions
                      </div>
                </div>
                <div>
                    <h3 className='text-[25px] font-bold'>Technicians near you</h3>


                </div>
            </div>
                    
            <div className="bg-zinc-700 text-white rounded-lg shadow-lg p-4 w-full h-2/5 md:w-2/12 md:h-3/4 relative">
                <div className="flex flex-row md:flex-col gap-6 items-center justify-center mb-10">
                    <div className="relative w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] overflow-hidden rounded-full shadow-md group">
                        <div className="absolute bg-black group-hover:opacity-60 opacity-0 w-full h-full transition-all">
                                    <div className="flex justify-center items-center h-full">
                                    <FaCamera className="text-white text-xl md:text-4xl" />
                                    </div>
                         </div>
                                <img
                                    src={
                                        "/image/defaultProfilePicture.jpg"
                                    }
                                    className="rounded-full w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] cursor-pointer "
                                    alt="Fotografía de perfil"
                                />
                                <input
                                    id="file-upload"
                                    type="file"
                                    name=""
                                    accept="image/gif, image/jpeg, image/png"
                                    className="absolute top-0 right-0 min-w-full min-h-full opacity-0 cursor-pointer bg-center object-cover object-center"
                                />
                            </div>

                            <div className="flex flex-col justify-center items-center mb-6">
                                <div className="w-full text-center text-[27px] font-bold p-0 m-0  mb-2">
                                    Welcome to The Panda
                                </div>
                                <div className="w-full flex justify-center items-center  mb-6 p-0">
                                    <div className="w-[110px] text-center text-[14px] rounded-lg border-[1px] border-green-500 bg-green-500 text-white">Session Verified</div>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-xl flex flex-col  p-2 mb-2">
                                    <span className="text-gray-400 text-[13px]">Role:</span><span className="text-emerald-500 font-bold  text-[16px]">Guest user</span>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-xl flex flex-col  p-2 mb-2">
                                    <span className="text-gray-400 text-[13px]">Access: </span><span className={`text-[16px] font-semibold `}>Limited</span>
                                </div>                                
                            </div>
                        </div>
                        <div className="absolute bottom-0 -left-0 w-full">
                            <div className="flex flex-col">
                            <Link href={'/'}
                                className="rounded-b-lg bg-emerald-600 h-[2.5rem] md:h-[3.5rem] font-bold text-white flex justify-center items-center"
                            >
                                Sign Out
                            </Link>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
  )
}

export default Guest