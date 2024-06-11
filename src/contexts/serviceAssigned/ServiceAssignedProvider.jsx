"use client";

import React, { useReducer, useEffect } from 'react';
import { ServiceAssignedContext } from './ServiceAssignedContext';
import { serviceAssignedReducer, initialState} from "../serviceAssigned/ServiceAssignedReducer";
import { client } from '../AmplifyContext';
import { listenUpdateService } from '@/graphql/services/subscriptions/subscription';

const ServiceAssignedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serviceAssignedReducer, initialState);

  useEffect(() => {
    const storedService = localStorage.getItem('serviceAssigned');
    if (storedService) {
      dispatch({
        type: 'SET_SERVICE_ASSIGNED',
        payload: JSON.parse(storedService),
      });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const setServiceAssigned = (service) => {
    dispatch({ type: 'SET_SERVICE_ASSIGNED', payload: service });
    localStorage.setItem('serviceAssigned', JSON.stringify(service));
  };

  const setTechnicianActivityStatus = (status) => {
    dispatch({ type: 'SET_TECHNICIAN_ACTIVITY_STATUS', payload: status });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const clearServiceAssigned = () => {
    dispatch({ type: "CLEAR_SERVICE_ASSIGNED" });
    localStorage.removeItem("serviceAssigned");
  };

  return (
    <ServiceAssignedContext.Provider
      value={{
        ...state,
        setServiceAssigned,
        setTechnicianActivityStatus,
        setLoading,
        clearServiceAssigned,
      }}
    >
      {children}
    </ServiceAssignedContext.Provider>
  );
};

export default ServiceAssignedProvider;