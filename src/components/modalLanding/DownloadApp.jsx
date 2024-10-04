"use client"

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {
  RiDownloadFill,
  RiStarFill,
  RiAppleFill,
} from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';
import customerApple from "../../../public/qr/customerApple.png"
import technicianApple from "../../../public/qr/technicianApple.png"
import logoPlayStore from "../../../public/image/playstoreLogo.webp";
import technicianAndroid from "../../../public/qr/technicianAndroid.png";
import customerAndroid from "../../../public/qr/customerAndroid.png";

const DownloadApp = ({isOpen, onOpenChange, mode}) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'
    scrollBehavior='outside'
    >
          <ModalContent className='bg-raisinBlack text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center gap-x-2 pt-8 pr-8 pl-8">
                <div className="flex gap-x-3 mb-2">
                    <div className="rounded-3xl w-[80px] h-[80px] overflow-hidden bg-white">
                       <img src="/panda.webp" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex flex-col">
                       <h4 className="text-white h-[40px] font-chackra text-[20px] font-light">The Panda <span className='text-emerald-300 uppercase font-bold'>{mode}</span> App</h4>
                       <div className="flex gap-x-1">
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                       </div>
                    </div>
                </div>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center pr-8 pl-8 pb-8'>
                  <div className='w-full flex flex-col'>
                      <div className='w-full flex lg:mb-2 mb-4'>
                        <div className='md:w-1/2 w-full flex flex-col items-center justify-center'>
                          <h2 className=" w-full text-[40px] md:text-left text-center text-white font-bold mb-2">Get the App for <span className='text-emerald-400'>Apple</span></h2>
                          <p className="w-full text-[20px] md:text-left text-center text-gray-200 mb-8">Scan the QR code with your smartphone camera.</p>
                          <div className='w-full flex justify-center items-center'>
                              <a target="_blank" rel="noopener noreferrer" href={mode=="customer"? `https://www.google.com/url?q=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fpanda-customer%2Fid1670849690%3Fitsct%3Dapps_box_link%26itscg%3D30200&sa=D&sntz=1&usg=AOvVaw2A_qEjEwmik6zeUBVT2y9F` : "https://www.google.com/url?q=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fpanda-technician%2Fid1670848100%3Fitsct%3Dapps_box_promote_link%26itscg%3D30200&sa=D&sntz=1&usg=AOvVaw0s0myl_Vo-PjhVYwbFe-rC"} className='bg-gray-200 px-5 py-1 text-zinc-900 gap-x-2 rounded-xl flex items-center cursor-pointer hover:bg-gray-300 transition-colors'>
                                  <RiAppleFill className='text-[45px]'/>
                                  <div className='flex flex-col'>
                                      <span className='text-[15px] m-0 p-0'>Download on the</span>
                                      <span className='text-[24px] m-0 p-0 font-bold'>App Store</span>
                                  </div>
                              </a>
                          </div>
                        </div>
                        <div className='md:flex hidden w-1/2 h-[300px]  justify-center items-center  pt-2'>
                          <div className='lg:w-[300px] w-[250px] h-[300px] overflow-hidden'>
                              <div className='lg:w-[300px] w-[250px] h-[350px] border-t-[8px] flex px-5 pt-5 border-r-[8px] rounded-3xl border-l-[8px] border-emerald-400'>
                                  <div className='lg:w-[300px] w-[250px] flex justify-center items-center max-w-[100%] h-[270px] border-[1px] border-gray-500 rounded-3xl p-4'>
                                      <Image 
                                          alt='qrCustomersApple'
                                          src={mode=="customer" ? customerApple : technicianApple}
                                          placeholder='blur'
                                          quality={100}
                                          // fill
                                          sizes='100vw'
                                          style={{
                                            objectFit : "cover"
                                          }}
                                      />
                                  </div>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className='w-full flex'>                      
                        <div className='md:flex hidden w-1/2 h-[300px] justify-center items-center  pt-2'>
                          <div className='w-[300px] h-[300px] overflow-hidden'>
                              <div className='w-[300px] h-[350px] border-t-[8px] flex px-5 pt-5 border-r-[8px] rounded-3xl border-l-[8px] border-gray-200'>
                                  <div className='w-[300px] flex justify-center items-center max-w-[100%] h-[270px] border-[1px] border-gray-500 rounded-3xl p-4'>
                                      <Image 
                                          alt='qrCustomersApple'
                                          src={mode=="customer" ? customerAndroid : technicianAndroid}
                                          placeholder='blur'
                                          quality={100}
                                          // fill
                                          sizes='100vw'
                                          style={{
                                            objectFit : "cover"
                                          }}
                                      />
                                  </div>
                              </div>
                            </div>
                        </div>
                        <div className='md:w-1/2 w-full flex flex-col items-center justify-center'>
                          <h2 className="w-full md:text-right text-center text-[40px] text-white font-bold mb-2">Or the App for <span className='text-emerald-400'>Android</span></h2>
                          <p className="w-full md:text-right text-center text-[20px] text-gray-200 mb-8">Scan the QR code with your smartphone camera.</p>
                          <div className='w-full flex justify-center items-center'>
                              <a target="_blank" rel="noopener noreferrer" href={mode=="customer"?'https://play.google.com/store/apps/details?id=com.techethio.panda':"https://play.google.com/store/apps/details?id=com.panda.technician"} className='bg-darkBlack px-4 py-2 text-white gap-x-2 rounded-xl flex items-center cursor-pointer hover:bg-black transition-colors'>
                                  <Image
                                    alt='logoPlayStore'
                                    src={logoPlayStore}
                                    placeholder='blur'
                                    quality={100}
                                    // fill
                                    sizes='100vw'
                                    style={{
                                      objectFit : "cover"
                                    }}
                                    className='w-[40px]'
                                  />
                                  <div className='flex flex-col'>
                                      <span className='text-[15px] m-0 p-0'>Get it on</span>
                                      <span className='text-[24px] m-0 p-0 font-bold'>Google Play</span>
                                  </div>
                              </a>
                          </div>
                        </div>
                      </div>
                  </div>
                  
                </ModalBody>
                <ModalFooter>
                    
                </ModalFooter>
              </>
            )}
          </ModalContent>
    </Modal> 
  )
}

export default DownloadApp