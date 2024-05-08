import React from 'react'

export default function ServiceForm() {
    return (
        <div className='container mx-auto px-4 w-[90%]'>
            <p>Make a request</p>
            <div className='flex flex-col gap-4'>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    placeholder="Username"
                />
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    placeholder="Username"
                />
                <button>
                    Send Request
                </button>
            </div>
        </div>
    )
}
