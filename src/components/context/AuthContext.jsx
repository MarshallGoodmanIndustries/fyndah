import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken') || null);
  const [userData, setUserData] = useState(
    sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : null
  );

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

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};



// import { createContext, useEffect, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken') || null);
//   const [userData, setUserData] = useState(sessionStorage.getItem('userData') || null);

//   useEffect(() => {
//     if (authToken) {
//       sessionStorage.setItem('authToken', authToken);
//     } else {
//       sessionStorage.removeItem('authToken');
//     }
//   }, [authToken]);

//   useEffect(() => {
//     if (userData) {
//       sessionStorage.setItem('userData', userData);
//     } else {
//       sessionStorage.removeItem('userData');
//     }
//   }, [userData]);

//   return (
//     <AuthContext.Provider value={{ authToken, setAuthToken, userData, setUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
