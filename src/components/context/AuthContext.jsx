import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken') || null);
  const [userData, setUserData] = useState(
    sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : null
  );
  const [businessId, setBusinessId] = useState(sessionStorage.getItem('businessId') || null);
  const [userMsgId, setUserMsgId] = useState(sessionStorage.getItem('userMsgId') || null);
  const [businessMsgId, setBusinessMsgId] = useState(sessionStorage.getItem('businessMsgId') || null);
  const [currentRoute, setCurrentRoute] = useState(sessionStorage.getItem('currentRoute') || null)

  useEffect(() => {
    if (authToken) {
      sessionStorage.setItem('authToken', authToken);
    } else {
      sessionStorage.removeItem('authToken');
    }
  }, [authToken]);

  useEffect(() => {
    if (userMsgId) {
      sessionStorage.setItem('userMsgId', userMsgId);
    } else {
      sessionStorage.removeItem('userMsgId');
    }
  }, [userMsgId]);

  useEffect(() => {
    if (businessMsgId) {
      sessionStorage.setItem('businessMsgId', businessMsgId);
    } else {
      sessionStorage.removeItem('businessMsgId');
    }
  }, [businessMsgId]);

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
    if (currentRoute) {
      sessionStorage.setItem('currentRoute', currentRoute);
    } else {
      sessionStorage.removeItem('currentRoute');
    }
  }, [currentRoute]);

  return (
    <AuthContext.Provider value={{
      authToken,
      setAuthToken,
      userData,
      setUserData,
      businessId,
      setBusinessId,
      userMsgId,
      setUserMsgId,
      businessMsgId,
      setBusinessMsgId,
      currentRoute,
      setCurrentRoute
    }}>
      {children}
    </AuthContext.Provider>
  );
};
