"use client"

import { MapTechnicianContext } from './MapTechnicianContext';
import { useReducer } from 'react';
import { mapTechnicianReducer } from './MapTechnicianReducer';

const INITIAL_STATE = {
    isMapReady: false,
    map: undefined
}

export const MapProvider = ({children}) => {

    const [state, dispatch] = useReducer(mapTechnicianReducer, INITIAL_STATE);

    const setTechnicianMap = (map) => {
        dispatch({type: 'setTechnicianMap', payload: map});
    }

    return(
        <MapTechnicianContext.Provider value={{
            ...state,
            setTechnicianMap
        }}>
            {children}
        </MapTechnicianContext.Provider>
    )

}