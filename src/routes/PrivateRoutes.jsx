import { AuthContext } from "../components/context/AuthContext";

import { useContext } from 'react';
import {  Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const { authToken } = useContext(AuthContext);

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
