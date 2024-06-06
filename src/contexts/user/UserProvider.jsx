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

    const login = (userData) => {
        console.log(userData);
        Cookies.set(
            "currentUser",
            JSON.stringify(userData)
        );
        dispatch({ type: 'setUser', payload: userData });
    }

    const logout = () => {
        Cookies.remove('currentUser');
        dispatch({
            type: 'setUser',
        })
    }

    useEffect(() => {
        const userFromCookies = getUserFromCookies();
        if(userFromCookies) {
            dispatch({ type: 'setUser', payload: userFromCookies })
        }
    }, []);

    return(
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