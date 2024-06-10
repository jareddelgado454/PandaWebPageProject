'use client';
import { useEffect, useReducer, useState } from "react";
import { ServiceReducer } from "./ServiceReducer";
import Cookies from "js-cookie";
import { ServiceContext } from "./ServiceContext";
import GearSpinner from "@/components/GearSpinner";

const INITIAL_STATE = {
    serviceRequest: undefined
}


export const ServiceProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ServiceReducer, INITIAL_STATE);
    const [loading, setLoading] = useState(true);

    const getServiceFromCookies = () => {
        const serviceCookie = Cookies.get("ServiceRequest");
        if(serviceCookie) {
            try {
                return JSON.parse(serviceCookie);
            } catch (error) {
                console.log('Error parsing service cookie', error);
                return null;
            }
        }
    }

    useEffect(() => {
        const serviceFromCookies = getServiceFromCookies();
        if(serviceFromCookies) {
            dispatch({ type: 'setServiceRequest', payload: serviceFromCookies });
        }
        setLoading(false);
      }, []);
    
    const setServiceRequest = (serviceRequest) => {
        dispatch({type: 'setServiceRequest', payload: serviceRequest});
    }

    const setServiceCoordinates = (coordinates) => {
        dispatch({type: 'updateServiceCoordinates', payload: coordinates});
    }

    if (loading) {
        return (
            <div className='h-screen flex flex-col relative p-4 overflow-hidden justify-center items-center'>
                <GearSpinner />
            </div>
        )
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