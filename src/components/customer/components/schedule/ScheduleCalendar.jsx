'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Spinner, useDisclosure } from '@nextui-org/react';
import ScheduledModal from '../../modals/ScheduledModal';
import { client } from '@/contexts/AmplifyContext';
import { retrieveScheduledServicesByTechnicianId } from '@/graphql/schedule/query';
const ScheduleCalendar = ({setCurrentStep, dates, setDates, technicianSelectedId, calendarType}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState();
  const onOpenModal = (start, end) => {
    onOpen();
    setDates({start, end});
  }
  const getScheduledServices = async() => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: retrieveScheduledServicesByTechnicianId,
        variables: {
          technicianOfferedId: technicianSelectedId
        }
      });
      const eventsDB = data.listScheduledServices.items;
      const eventStructured = eventsDB.map((i) => (
        {
          title: 'Service',
          start: i.dateStartScheduled,
          end: i.dateEndScheduled
        }
      ));
      setEvents(eventStructured);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }
  useEffect(() => {getScheduledServices();}, []);
  
  return (
    <>
    <ScheduledModal isOpen={isOpen} onOpenChange={onOpenChange} dates={dates} setDates={setDates} setCurrentStep={setCurrentStep} />
    <div className='w-full px-2 py-4 h-[85%] overflow-y-scroll' style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      <p className='text-center tracking-wider font-semibold text-2xl'>Technician Availability</p>
      {loading ? <Spinner color='success' /> : error ? (<div className='h-full w-full flex justify-center items-center'><p>Something went wrong.</p></div>) : events && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          weekends={calendarType === "weekdays" ? false : true}
          events={events}
          eventContent={renderEventContent}
          selectable={true}
          select={({ start, end }) => onOpenModal(start, end)}
          validRange={{
            start: new Date()
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }}
        />
      )}
    </div>
    </>
  )
}

export default ScheduleCalendar

function renderEventContent(eventInfo) {
  console.log(eventInfo);
    return (
      <div className='bg-rose-600 w-full rounded-lg my-1 mx-2 py-1 px-2'>
        <div className='w-full h-full flex gap-1 text-white tracking-wider font-medium'>
          <p>{eventInfo.timeText}</p>
          <p>Busy</p>
        </div>
      </div>
    )
  }