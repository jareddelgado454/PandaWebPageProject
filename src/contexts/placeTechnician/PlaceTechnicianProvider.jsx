'use client';
import React, { useReducer, useEffect } from 'react';
import { PlaceTechnicianContext } from './PlaceTechnicianContext';
import { getUserLocation } from '@/helpers/getUserLocation';
import { placeTechnicianReducer } from './placeTechnicianReducer';

const INITIAL_STATE = {
    isLoading: true,
    technicianLocation: undefined
}

export const PlaceTechnicianProvider = ({ children }) => {

    const [state, dispatch] = useReducer(placeTechnicianReducer, INITIAL_STATE);

    const updateTechnicianLocation = (newLocation) => {
      dispatch({ type: 'setTechnicianLocation', payload: newLocation });
    };
  
    useEffect(() => {  
      getUserLocation().then(lngLat => dispatch({ type: 'setTechnicianLocation', payload: lngLat }))
    }, []);
  
    return (
      <PlaceTechnicianContext.Provider value={{
        ...state,
        updateTechnicianLocation
      }}>
        { children }
      </PlaceTechnicianContext.Provider>
    )
  }
  