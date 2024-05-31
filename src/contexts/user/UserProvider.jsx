'use client';
import { useEffect, useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './UserReducer';
import Cookies from 'js-cookie';

const INITIAL_USER_STATE = {
    user: {
        role: "",
        expiredAt: null,
        id: ""
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_USER_STATE);

    const getUserFromCookies = () => {
        const userCookie = Cookies.get('currentUser');
        if (userCookie) {
          try {
            return JSON.parse(userCookie);
          } catch (error) {
            console.error('Error parsing user cookie', error);
            return null;
          }
        }
        return null;
    };

    useEffect(() => {
        const userFromCookies = getUserFromCookies();
        if(userFromCookies) {
            dispatch({ type: 'setUser', payload: userFromCookies })
        }
    }, []);

    return(
        <UserContext.Provider
            value={{
                ...state
            }}
        >
            {children}
        </UserContext.Provider>
    )
    
}