import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-zinc-900 text-white text-[40px]'>
        <div className='flex rotate-[30deg] justify-center items-center h-full gap-8'>
            <div className="wrapper">
                <div className="gear">
                    <span style={{ '--i': 1 }}></span>
                    <span style={{ '--i': 2 }}></span>
                    <span style={{ '--i': 3 }}></span>
                    <span style={{ '--i': 4 }}></span>
                    <span style={{ '--i': 5 }}></span>
                    <span style={{ '--i': 6 }}></span>
                </div>
                <div className="wrapper wrapper2">
                    <div className="gear">
                        <span style={{ '--i': 1 }}></span>
                        <span style={{ '--i': 2 }}></span>
                        <span style={{ '--i': 3 }}></span>
                        <span style={{ '--i': 4 }}></span>
                        <span style={{ '--i': 5 }}></span>
                        <span style={{ '--i': 6 }}></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loading