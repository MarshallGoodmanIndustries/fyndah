import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken') || null);
  const [userData, setUserData] = useState(
    sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : null
  );
  const [businessId, setBusinessId] = useState(sessionStorage.getItem('businessId') || null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (authToken) {
      sessionStorage.setItem('authToken', authToken);
    } else {
      sessionStorage.removeItem('authToken');
    }
  }, [authToken]);

  useEffect(() => {
    if (userData) {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    } else {
      sessionStorage.removeItem('userData');
    }
  }, [userData]);

  useEffect(() => {
    if (businessId) {
      sessionStorage.setItem('businessId', businessId);
    } else {
      sessionStorage.removeItem('businessId');
    }
  }, [businessId]);

  useEffect(() => {
    const newSocket = io('http://localhost:5173', { query: { authToken } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, userData, setUserData, businessId, setBusinessId, socket }}>
      {children}
    </AuthContext.Provider>
  );
};
