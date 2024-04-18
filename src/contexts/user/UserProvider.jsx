'use client';
import { useEffect, useReducer } from 'react';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import {  jwtDecode } from 'jwt-decode';
import { authReducer } from './UserReducer';
import UserContext from './UserContext';
import { getUserByMail } from '@/api';

const initialState = {
    user: null,
    token: null,
}

function UserProvider(props)
{
    const [state, dispatch] = useReducer(authReducer, initialState);

    async function checkToken(){

        const { idToken } = (await fetchAuthSession()).tokens ?? {};

        if (idToken) {
            const decodedToken = jwtDecode(idToken);
          
            if (decodedToken.exp * 1000 < Date.now()) {
              signOut();
            } else {
                const user = await getUserByMail(email);
                initialState.token = idToken;
                initialState.user = user;
            }
        }

    }

    useEffect(() => {
        checkToken();
    }, []);

    async function checkAuthSession() {
        try {
            const { idToken } = (await fetchAuthSession()).tokens ?? {};
            if (idToken) {
                const decodedToken = jwtDecode(idToken);
                const email = decodedToken.email;
                console.log(decodedToken);
                console.log(`email: ${email}`);
                return email;
                
            } else {
                console.log("No idToken found in the session.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching auth session:", error);
            return;
        }
    }

    async function login() {
        const email = await checkAuthSession();
        const user = getUserByMail(email);
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
                token
            }
        });
    };

    function logout() {
        signOut();
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                token: state.token,
                login,
                logout
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };