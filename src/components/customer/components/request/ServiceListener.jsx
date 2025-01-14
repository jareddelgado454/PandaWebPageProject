'use client';
import React, { useContext, useEffect } from 'react'
import { client } from '@/contexts/AmplifyContext';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { listCurrentService } from '@/graphql/services/queries/query';
import { UserContext } from '@/contexts/user/UserContext';
export const ServiceListener = () => {
    const { user } = useContext(UserContext);
    const { setServiceRequest } = useContext(ServiceContext);
    useEffect(() => {
      console.log('launched');
    }, []);
    
    return null;
}
