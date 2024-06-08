import React from 'react';
export default function LoadingComponent() {
    return (
        <div className='transition-all absolute w-full h-full flex justify-center items-center top-0 overflow-hidden'>
            <div className='loader bg-green-pan' />
        </div>
    )
}
