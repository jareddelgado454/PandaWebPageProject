import React from 'react'

export default function GearSpinner() {
    return (
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

    )
}
