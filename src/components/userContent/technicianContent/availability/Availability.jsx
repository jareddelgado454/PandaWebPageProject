import React from 'react'
import ScheduleDay from './ScheduleDay'

const Availability = () => {
  const daysSchedule = [
      {day: "Monday", opening : "09:00", closing : "18:00"},
      {day: "Tuesday", opening : "09:00", closing : "18:00"},
      {day: "Wednesday", opening : "09:00", closing : "18:00"},
      {day: "Thursday", opening : "09:00", closing : "18:00"},
      {day: "Friday", opening : "09:00", closing : "18:00"},
      {day: "Saturday", opening : "closed", closing : "closed"},
      {day: "Sunday", opening : "closed", closing : "closed"},
  ]
  return (
    <div className='w-full flex-flex-col'>
        {
            daysSchedule.map((daySchedule, index) => <ScheduleDay key={index} daySchedule={daySchedule}/>)
        }

    </div>
  )
}

export default Availability