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
  const [userMsgId, setUserMsgId] = useState(sessionStorage.getItem('userMsgId') || null);
  const [businessMsgId, setBusinessMsgId] = useState(sessionStorage.getItem('businessMsgId') || null);
  const [profilePhoto, setProfilePhoto] = useState(sessionStorage.getItem('profilePhoto') || null);

  useEffect(() => {
    if (profilePhoto) {
      sessionStorage.setItem('profilePhoto', profilePhoto);
    } else {
      sessionStorage.removeItem('profilePhoto');
    }
  }, [profilePhoto]);

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
    const newSocket = io('http://localhost:5173', { query: { authToken } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [authToken]);

  return (
    <AuthContext.Provider value={{
      authToken,
      setAuthToken,
      userData,
      setUserData,
      businessId,
      setBusinessId,
      socket,
      userMsgId,
      setUserMsgId,
      businessMsgId,
      setBusinessMsgId,
      setProfilePhoto,
      profilePhoto
    }}>
      {children}
    </AuthContext.Provider>
  );
};



// import { createContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken') || null);
//   const [userData, setUserData] = useState(
//     sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : null
//   );
//   const [businessId, setBusinessId] = useState(sessionStorage.getItem('businessId') || null);
//   const [socket, setSocket] = useState(null);
//   const [userMsgId, setUserMsgId] = useState(sessionStorage.getItem('userMsgId') || null)
//   const [businessMsgId, setBusinessMsgId] = useState(sessionStorage.getItem('businessMsgId') || null)

//   useEffect(() => {
//     if (authToken) {
//       sessionStorage.setItem('authToken', authToken);
//     } else {
//       sessionStorage.removeItem('authToken');
//     }
//   }, [authToken]);

//   useEffect(() => {
//     if (userMsgId) {
//       sessionStorage.setItem('userMsgId', userMsgId);
//     } else {
//       sessionStorage.removeItem('userMsgId');
//     }
//   }, [userMsgId]);

//   useEffect(() => {
//     if (businessMsgId) {
//       sessionStorage.setItem('businessMsgId', businessMsgId);
//     } else {
//       sessionStorage.removeItem('businessMsgId');
//     }
//   }, [businessMsgId]);

//   useEffect(() => {
//     if (userData) {
//       sessionStorage.setItem('userData', JSON.stringify(userData));
//     } else {
//       sessionStorage.removeItem('userData');
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (businessId) {
//       sessionStorage.setItem('businessId', businessId);
//     } else {
//       sessionStorage.removeItem('businessId');
//     }
//   }, [businessId]);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5173', { query: { authToken } });
//     setSocket(newSocket);

//     return () => newSocket.close();
//   }, [authToken]);

//   return (
//     <AuthContext.Provider value={{ authToken, setAuthToken, userData, setUserData, businessId, setBusinessId, socket, userMsgId, setUserMsgId,
//       businessMsgId, setBusinessMsgId
//      }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };