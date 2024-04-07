import React, { createContext, useState } from 'react';

export const AuthContex = createContext();

export const AuthProvider = ({ children }) => {
    const [test, setTest] = useState('Hipdz');

    return <AuthContex.Provider value={test}>{children}</AuthContex.Provider>;
};
