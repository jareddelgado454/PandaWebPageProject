'use client';
const { createContext } = require("react");

const UserContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

export default UserContext;