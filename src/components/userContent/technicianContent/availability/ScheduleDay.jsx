"use client"

import React from 'react'

const ScheduleDay = ({daySchedule}) => {
  return (
    <div className='flex'>
        <h4>{daySchedule?.day}</h4>
         
    </div>
  )
}

export default ScheduleDay