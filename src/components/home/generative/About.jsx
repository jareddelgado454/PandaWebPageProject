import React from 'react'

const About = () => {
    return (
        <div className='flex justify-center items-center w-full text-[#E6D5C9] p-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 xl:grid-cols-3 w-full'>
                <div className='bg-zinc-900 rounded-lg p-4 shadow-xl flex flex-col gap-4'>
                    <p className='tracking-widest font-bold'>Features</p>
                    <ul className='list-disc px-4 tracking-wider flex flex-col gap-3'>
                        <li>Tailored Instruction: Personalized repair guides adapted to the user’s skill level and preferences.
                        </li>
                        <li>
                            Interactive Learning: Step-by-step instructions enhanced by 3D animations and AR overlays for better understanding.
                        </li>
                        <li>
                            Real-time Feedback & Troubleshooting: AI analyzes user actions, offering real-time corrections and alternative solutions.
                        </li>
                        <li>
                            Adaptive Difficulty & Progression: Learning modules adjust dynamically based on user performance, promoting mastery and confidence.
                        </li>
                        <li>
                            Data-driven Insights: Instructors gain valuable insights into student progress to tailor interventions and improve learning outcomes.
                        </li>
                    </ul>
                </div>
                <div className='bg-zinc-900 rounded-lg p-4 shadow-xl flex flex-col gap-4'>
                    <p className='tracking-widest font-bold'>How It Works</p>
                    <ul className='list-disc px-4 tracking-wider flex flex-col gap-3'>
                        <li>Step 1: AI analyzes the user’s skill level and creates a personalized guide.</li>
                        <li>Step 2: Users follow interactive, step-by-step instructions with 3D visuals and AR integration.</li>
                        <li>Step 3: AI provides real-time feedback and troubleshooting as users progress.</li>
                        <li>Step 4: Performance data is analyzed to adapt the difficulty and provide insights for instructors.</li>
                    </ul>
                </div>
                <div className='bg-zinc-900 rounded-lg p-4 shadow-xl flex flex-col gap-4'>
                    <p className='tracking-widest font-bold'>Benefits</p>
                    <ul className='list-disc px-4 tracking-wider flex flex-col gap-3'>
                        <li>Personalized Learning: Every guide is tailored to individual preferences and learning speeds.</li>
                        <li>Immersive Experience: With AR overlays, users can interact with virtual components in real-world environments.</li>
                        <li>Real-time Support: Immediate feedback and guidance ensure users correct mistakes on the go.</li>
                        <li>Instructor Tools: Gain actionable insights into student performance and learning gaps.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About