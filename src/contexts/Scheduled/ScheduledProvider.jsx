'use client';
import React, { useEffect, useReducer, useState } from 'react';
import Cookies from "js-cookie";
import { ScheduledReducer } from './ScheduledReducer';
import { ScheduledServiceContext } from './ScheduledContext';
const INITIAL_STATE = {
    scheduledService: undefined,
}
export const ScheduledProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ScheduledReducer, INITIAL_STATE);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isNotificationSupported, setIsNotificationSupported] = useState(false);
    const getServiceFromCookies = () => {
        const scheduledServiceCookie = Cookies.get("scheduledService");
        if (scheduledServiceCookie) {
            try {
                return JSON.parse(scheduledServiceCookie);
            } catch (error) {
                console.log('Error parsing service cookie', error);
                return null;
            }
        }
    }
    useEffect(() => {
        const scheduledServiceFromCookies = getServiceFromCookies();
        if (scheduledServiceFromCookies) {
            dispatch({ type: 'setScheduledService', payload: scheduledServiceFromCookies });
        }
        setLoading(false);
    }, []);

    const setScheduledService = (scheduledService) => {
        dispatch({type: 'setScheduledService', payload: scheduledService});
    }

    useEffect(() => {
        if (typeof window !== "undefined" && "Notification" in window) {
            setIsNotificationSupported(true);
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        } else {
            setIsNotificationSupported(false);
            console.warn("La API de Notificaciones no está disponible en este entorno.");
        }
    }, []);


    return (
        <ScheduledServiceContext.Provider
            value={{
                ...state,
                setScheduledService,
                isModalOpen,
                setIsModalOpen
            }}
        >
            {children}
        </ScheduledServiceContext.Provider>
    )
}
