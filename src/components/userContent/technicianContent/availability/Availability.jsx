import React from 'react'
import ScheduleDay from './ScheduleDay'

const Availability = () => {
  const daysSchedule = [
      {day: "Monday", opening : "", closing : ""},
      {day: "Tuesday", opening : "", closing : ""},
      {day: "Wednesday", opening : "", closing : ""},
      {day: "Thursday", opening : "", closing : ""},
      {day: "Friday", opening : "", closing : ""},
      {day: "Saturday", opening : "", closing : ""},
      {day: "Sunday", opening : "", closing : ""},
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