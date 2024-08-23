'use client';
import { useEffect, useReducer, useState } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './UserReducer';
import Cookies from 'js-cookie';
import GearSpinner from '@/components/GearSpinner';
const INITIAL_USER_STATE = {
    user: {
        role: "",
        expiredAt: null,
        id: ""
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_USER_STATE);
    const [loading, setLoading] = useState(true);

    const getUserFromCookies = () => {
        const userCookie = Cookies.get('currentUser');
        if (userCookie && userCookie !== '') {
            try {
                return JSON.parse(userCookie);
            } catch (error) {
                console.error('Error parsing user cookie', error);
                return null;
            }
        }
        return null;
    };

    const login = (userData) => {
        Cookies.set(
            "currentUser",
            JSON.stringify(userData)
        );
        dispatch({ type: 'setUser', payload: userData });
    }

    const logout = () => {
        Cookies.remove('currentUser');
        dispatch({
            type: 'Logout'
        })
    }

    useEffect(() => {
        const userFromCookies = getUserFromCookies();
        if (userFromCookies) {
            dispatch({ type: 'setUser', payload: userFromCookies })
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='h-screen flex flex-col relative p-4 overflow-hidden justify-center items-center'>
                <GearSpinner />
            </div>
        )
    }

    return (
        <UserContext.Provider
            value={{
                ...state,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    )

}