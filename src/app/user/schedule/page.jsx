import React from 'react'
import Link from 'next/link'
import { RiArrowDropRightLine, RiMailOpenFill, RiAlertFill  } from "react-icons/ri";

const Schedule = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
        <div className="w-full h-[calc(100vh-100px)] flex flex-col px-8  rounded-xl pt-4">  
            <div className="w-full mb-6">
                <div className="w-[270px] bg-zinc-800 rounded-2xl flex items-center justify-center p-2 ">
                    <Link href={'/user'} className="text-zinc-400">
                        Technician panel
                    </Link>
                    <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
                    <Link href={'/user/schedule'} className="text-white">
                        Schedule
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Schedule