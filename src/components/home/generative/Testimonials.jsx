'use client';
import { testimonials } from '@/assets/data/Testimonials';
import React, { useState } from 'react'

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === faq.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? faq.length - 1 : prevIndex - 1
        );
    };
    // Handles touch start
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    // Handles touch move
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    // Detects swipe direction
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            nextSlide(); // swipe left
        }

        if (touchStart - touchEnd < -50) {
            prevSlide(); // swipe right
        }
    };
    return (
        <div className='relative w-full max-w-4xl mx-auto my-8 flex flex-col gap-5 cursor-grabbing px-3 md:px-0 text-[#E6D5C9]'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <p className='text-center text-[#E6D5C9]/60 font-semibold text-xs xl:text-lg'>Frequent Asked</p>
            <p className='text-center text-2xl xl:text-6xl 2xl:text-7xl font-black tracking-wider '>Questions</p>
            <div className='flex transition-transform duration-500 ease-in-out'>
                {testimonials.map((item, i) => (
                    <div
                        key={i}
                        className={`w-full ${i === currentIndex ? 'block' : 'hidden'}`}
                    >
                        <div className='p-4 bg-zinc-900 rounded-lg shadow-md h-[18rem]'>
                            <div className="mt-4 flex flex-col justify-center gap-5 h-full">
                                <div className='flex flex-row gap-4'>
                                    <div className='bg-zinc-700 h-[4rem] w-[4rem] rounded-full'></div>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold'>Johan Del Rio</p>
                                        <p className='text-xs text-[#E6D5C9]/50'>{i} days ago</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-[#E6D5C9]">{item.title}</h2>
                                </div>
                                <p className="text-zinc-400 leading-loose tracking-widest">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2" id="Faq-Section">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-green-panda" : "bg-gray-300"
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    )
}

export default Testimonials