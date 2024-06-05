import React from 'react';
export default function LoadingComponent() {
    return (
        <div className='transition-all absolute w-full h-full flex justify-center items-center bg-white/35 top-0'>
            <div className='loader bg-green-pan' />
        </div>
    )
}
