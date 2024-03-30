// components/CustomProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const CustomProtectedRoute = ({ element: Element, ...rest }) => {
  // Check if the user is authenticated by looking for the token in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
};

export default CustomProtectedRoute;
