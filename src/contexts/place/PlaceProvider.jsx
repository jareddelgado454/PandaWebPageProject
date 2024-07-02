'use client';
import React, { useReducer, useEffect } from 'react';
import { PlaceContext } from './PlaceContext';
import { getUserLocation } from '@/helpers/getUserLocation';
import { placeReducer } from './placeReducer';

const INITIAL_STATE = {
    isLoading: true,
    userLocation: null
}

export const PlaceProvider = ({ children }) => {

    const [state, dispatch] = useReducer(placeReducer, INITIAL_STATE);
  
    useEffect(() => {
      
      const userLocationStorage = localStorage.getItem('userLocation') ? JSON.parse(localStorage.getItem('userLocation')) : null;

      if(!userLocationStorage){
        getUserLocation().then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
      }else {
        dispatch({type: 'setUserLocation', payload: userLocationStorage})
      }
      
      // getUserLocation().then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))

    }, []);

    const updateUserLocation = (lngLat) => {
      localStorage.setItem('userLocation', JSON.stringify(lngLat));
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
  