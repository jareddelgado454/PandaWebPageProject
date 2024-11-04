import React from 'react'

const ConfirmSchedule = () => {
  return (
    <div className='p-4 flex flex-col md:flex-row gap-4 h-[85%]'>
      <div className='dark:bg-zinc-700 shadow-lg rounded-lg w-[80%]'>Form info 1</div>
      <div className='flex flex-col gap-4 w-[20%]'>
        <div className='dark:bg-zinc-700 shadow-lg rounded-lg h-[50%] w-full py-2'>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <div className='h-32 w-32 dark:bg-zinc-800 rounded-full'></div>
            <div>
              <p>Car brand:</p>
              <p>Car model:</p>
              <p>Car year:</p>
            </div>
          </div>
        </div>
        <div className='dark:bg-zinc-700 shadow-lg rounded-lg h-[50%] w-full py-2'>
          <div className='flex flex-col gap-4 justify-center items-center'>
            <div className='h-32 w-32 dark:bg-zinc-800 rounded-full'></div>
            <div>
              <p>FullName:</p>
              <p>Certifications:</p>
              <p>Technician since:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSchedule