'use client';

import { useEffect, useReducer } from "react";
import { ServiceReducer } from "./ServiceReducer";
import Cookies from "js-cookie";
import { ServiceContext } from "./ServiceContext";

const INITIAL_STATE = {
    serviceRequest: undefined
}


export const ServiceProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ServiceReducer, INITIAL_STATE);

    const serviceRequestFromCookies = Cookies.get("ServiceRequest") ? JSON.parse(Cookies.get("ServiceRequest")) : null;

    useEffect(() => {

        if(!serviceRequestFromCookies) return;

        dispatch({type: 'setServiceRequest', payload: serviceRequestFromCookies})

    }, []);
    
    const setServiceRequest = (serviceRequest) => {
        dispatch({type: 'setServiceRequest', payload: serviceRequest});
    }

    const setServiceCoordinates = (coordinates) => {
        dispatch({type: 'updateServiceCoordinates', payload: coordinates});
    }

    return(
        <ServiceContext.Provider value={{
            ...state,
            setServiceRequest,
            setServiceCoordinates,
        }}>
            {children}
        </ServiceContext.Provider>
    )

}