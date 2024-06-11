"use client"

import React, { useReducer, useEffect } from 'react';
import { TechnicianValidateStatusContext } from './TechnicianValidateStatusContext';
import TechnicianStatusReducer, {initialState} from './TechnicianValidateStatusReducer';
import { fetchTechnicianStatus, updateTechnicianStatus } from '@/services/technicianService';

const TechnicianValidateStatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TechnicianStatusReducer, initialState);

  useEffect(() => {
    const fetchStatus = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const status = await fetchTechnicianStatus();
        dispatch({ type: 'SET_IS_ONLINE', payload: status.isOnline });
        dispatch({ type: 'SET_STRIPE_STATUS', payload: status.stripeStatus });
        dispatch({ type: 'SET_TECHNICIAN_STATUS', payload: status.technicianStatus });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    };

    fetchStatus();
  }, []);

  const updateStatus = async (statusType, value) => {
    try {
      await updateTechnicianStatus(statusType, value);
      dispatch({ type: `SET_${statusType.toUpperCase()}`, payload: value });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };

  return (
    <TechnicianValidateStatusContext.Provider value={{ ...state, updateStatus }}>
      {children}
    </TechnicianValidateStatusContext.Provider>
  );
};

export default TechnicianValidateStatusProvider;