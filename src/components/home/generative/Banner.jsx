import { baseUrl } from '@/utils/CloudFront'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
    <div className='relative h-[100vh] w-full overflow-hidden text-[#E6D5C9]'>
        <video
          loop
          autoPlay
          muted
          playsInline
          className='absolute top-0 left-0 w-full h-full object-cover opacity-25 -z-[1]'
        >
          <source src={`${baseUrl}home/Background_IA.mp4`} type='video/mp4' />
          Your browser not supports this tag
        </video>
        <div className='flex flex-row justify-between items-center p-4 '>
          <Link href={'/'} className='flex flex-row gap-2 items-center bg-zinc-900/60 p-2 rounded-3xl'>
            <Image src={'/panda.webp'} width={200} height={200} className='w-[5rem] h-[4rem]' alt='Panda_Logo_web' />
            <p className='text-[#E6D5C9] text-2xl tracking-widest font-semibold'>Panda</p>
          </Link>
          <Link href={"/home/generative/students"}>
            <button className='bg-emerald-300 rounded-lg px-4 py-2 justify-center items-center hover:bg-emerald-400 transition-all'>
              <p className='text-black font-bold'>Students</p>
            </button>
          </Link>
        </div>
        <div className='flex flex-wrap md:flex-nowrap m-4 gap-4 absolute top-[30%] left-0'>
          <div className='w-full md:w-[40%] bg-zinc-900/60 py-6 px-8 flex flex-col gap-8 rounded-lg'>
            <p className='tracking-widest text-lg xl:text-5xl text-center font-black'>Panda Generative Artificial Intelligence</p>
            <p className='tracking-wider text-center leading-loose'>Our solution leverages cutting-edge generative AI to create personalized, step-by-step repair guides tailored to individual skill levels, vehicle models, and learning preferences.</p>
            <div className='flex justify-center items-center w-full'>
              <Button className='bg-green-panda text-white font-medium tracking-wider w-[50%]'>
                Find Out More
              </Button>
            </div>
          </div>
          <div className='w-full hidden md:w-[60%] md:flex md:justify-center md:items-center'>
            <div className='bg-zinc-900/60 rounded-lg'>
              <Image src={'/image/home/Brain.webp'} width={400} height={400} className='w-[23rem] h-[19rem] drop-shadow-2xl' alt='brain-image' />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Banner