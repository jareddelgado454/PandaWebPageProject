import React from 'react';
export default function LoadingComponent() {
    return (
        <div className='transition-all absolute inset-0 w-full h-full flex justify-center items-center top-0 overflow-y-hidden overflow-x-hidden'>
            <div className='loader bg-green-pan' />
        </div>
    )
}
