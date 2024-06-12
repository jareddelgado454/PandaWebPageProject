'use client';
import { useEffect, useReducer, useState } from "react";
import { ServiceReducer } from "./ServiceReducer";
import Cookies from "js-cookie";
import { ServiceContext } from "./ServiceContext";
import GearSpinner from "@/components/GearSpinner";
import { onUpdateServiceStatus } from "@/graphql/users/customer/subscription";
import { client } from "../AmplifyContext";
const INITIAL_STATE = {
    serviceRequest: undefined
}


export const ServiceProvider = ({ children }) => {
    const [status, setStatus] = useState(null);
    const [serviceId, setServiceId] = useState(null);
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

    useEffect(() => {
        if (state?.serviceRequest) {
            const subscription = client
                .graphql({
                    query: onUpdateServiceStatus,
                    variables: { serviceId: state.serviceRequest.id }
                })
                .subscribe({
                    next: ({ data }) => {
                        const updatedService = data.onUpdateService;
                        if (updatedService) {
                            setStatus(updatedService.status);
                        }
                    },
                    error: (error) => {
                        console.error(error);
                    }
                });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [state?.serviceRequest]);

    useEffect(() => {
        if (status) {
            notifyStatusChange(status);
        }
    }, [status]);

    const notifyStatusChange = (newStatus) => {
        if (Notification.permission === 'granted') {
            new Notification('Service Status Update', {
                body: `The service status has changed to: ${newStatus}`,
                icon: 'https://master.d3dtglewderhtg.amplifyapp.com/panda.png'
            });
        }
    };

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
            setServiceId
        }}>
            {children}
        </ServiceContext.Provider>
    )

}