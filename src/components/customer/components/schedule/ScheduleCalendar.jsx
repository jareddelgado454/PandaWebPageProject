'use client';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDisclosure } from '@nextui-org/react';
import ScheduledModal from '../../modals/ScheduledModal';
const events = [
    { title: 'Meeting', start: new Date()}
]
const ScheduleCalendar = ({setCurrentStep}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date(),
  })
  const onOpenModal = (start, end) => {
    onOpen();
    setDates({start, end});
  }
  return (
    <>
    <ScheduledModal isOpen={isOpen} onOpenChange={onOpenChange} dates={dates} setCurrentStep={setCurrentStep} />
    <div className='w-full px-2 py-4 h-[85%] overflow-y-scroll' style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      <p className='text-center tracking-wider font-semibold text-2xl'>Technician Availability</p>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends
        events={events}
        eventContent={renderEventContent}
        selectable={true}
        select={({ start, end }) => onOpenModal(start, end)}
      />
    </div>
    </>
  )
}

export default ScheduleCalendar

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }