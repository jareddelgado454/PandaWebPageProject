'use client';
import React, { useReducer, useEffect } from 'react';
import { PlaceContext } from './PlaceContext';
import { getUserLocation } from '@/helpers/getUserLocation';
import { placeReducer } from './placeReducer';

const INITIAL_STATE = {
    isLoading: true,
    userLocation: undefined
}

export const PlaceProvider = ({ children }) => {

    const [state, dispatch] = useReducer(placeReducer, INITIAL_STATE);
  
    useEffect(() => {
      
      getUserLocation().then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
      
    }, []);

    const updateUserLocation = (lngLat) => {
      dispatch({ type: 'setUserLocation', payload: lngLat });
    }
  
    return (
      <PlaceContext.Provider value={{
        ...state,
        updateUserLocation
      }}>
        { children }
      </PlaceContext.Provider>
    )
  }
  