'use client';
import React, { useState } from 'react';
import { faq } from '@/assets/data/Faq';
const AskedQuestion = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === plants.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? plants.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className='relative w-full max-w-4xl mx-auto my-8 flex flex-col gap-5' >
            <p className='text-center text-[#E6D5C9]/60 font-semibold text-xs xl:text-lg'>Frequent Asked</p>
            <p className='text-center text-2xl xl:text-6xl 2xl:text-7xl font-black tracking-wider text-[#E6D5C9]'>Questions</p>
            <div className='flex transition-transform duration-500 ease-in-out'>
                {faq.map((item, i) => (
                    <div
                        key={i}
                        className={`w-full ${i === currentIndex ? 'block' : 'hidden'}`}
                    >
                        <div className='p-4 bg-zinc-900 rounded-lg shadow-md h-[18rem]'>
                            <div className="text-center mt-4 flex flex-col items-center justify-center gap-5 h-full">
                                <h2 className="text-lg font-semibold text-[#E6D5C9]">{item.question}</h2>
                                <p className="text-zinc-400 leading-loose tracking-widest">{item.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2" id="Faq-Section">
                {faq.map((_, index) => (
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

export default AskedQuestion