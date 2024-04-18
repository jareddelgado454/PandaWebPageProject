import React from 'react'

function page() {
  return (
    <div className="w-full h-screen relative">
        <img
            src="https://autenticos4x4.com/wp-content/uploads/2019/03/taller-mecanico-reparacion-vehiculos.jpg"
            alt="background_user"
            className="absolute w-full h-full object-cover bg-center"
            loading="eager"
        />
        <div className="absolute w-full h-full bg-gray-600 opacity-80" />
        <div className='absolute w-full h-full flex flex-col md:flex-row justify-center items-center'>
            <div className='flex justify-center items-center'>
                <div className='bg-white h-[35rem] w-[35rem] rounded-lg shadow-lg slide-in-left'>
                    <div className='flex flex-col items-center justify-center gap-8'>
                        <img
                            src="/panda.png"
                            alt="panga_logo"
                            className='w-[12rem] h-[12rem] drop-shadow-lg'
                        />
                        
                        <p className='text-left font-bold text-2xl md:text-4xl capitalize'>Check your email</p>
                        <p className='text-zinc-500'>We just mail you with the verification code</p>
                        <input
                            type="text"
                            className='shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='Type the code...'  
                        />
                        <button
                            type='button'
                            className='bg-green-panda text-white font-bold py-2 px-4 rounded-lg w-2/3 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-700 duration-300'
                        >
                            Verify Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page;