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

    useEffect(() => {
        const serviceRequestFromCookies = Cookies.get("ServiceRequest");
        if (serviceRequestFromCookies) {
          try {
            const parsedServiceRequest = JSON.parse(serviceRequestFromCookies);
            dispatch({ type: 'setServiceRequest', payload: parsedServiceRequest });
          } catch (error) {
            console.error('Error parsing service request from cookies', error);
          }
        }
        setLoading(false);
      }, [dispatch]);
    
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