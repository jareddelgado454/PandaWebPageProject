'use client';
import { MapContext } from './MapContext';
import { useReducer } from 'react';
import { mapReducer } from './MapReducer';

const INITIAL_STATE = {
    isMapReady: false,
    map: undefined
}

export const MapProvider = ({children}) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const setMap = (map) => {
        dispatch({type: 'setMap', payload: map});
    }
    return(
        <MapContext.Provider value={{
            ...state,
            setMap
        }}>
            {children}
        </MapContext.Provider>
    )
}