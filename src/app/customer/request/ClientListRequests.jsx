'use client';
import React from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import { ListRequestServicesComponent, ListScheduledServicesComponent } from '@/components/customer';
export default function ClientListRequests() {
  return (
    <div className='h-full relative'>
      <div className='p-4 h-full overflow-y-auto'>
        <Tabs aria-label='Options'>
          <Tab key="Requested" title="Requested">
            <ListRequestServicesComponent />
          </Tab>
          <Tab key="Scheduled" title="Scheduled">
            <ListScheduledServicesComponent />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
