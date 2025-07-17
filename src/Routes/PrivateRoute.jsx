import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loader from '../Components/Shared/Loader/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
  const { user, loading } = useAuth();
  console.log(user)
  console.log('before loader',loading);

  const location = useLocation();
//   console.log(location.pathname)

  if (loading) {
    return <Loader></Loader>;
  }

  console.log('loading after loader' , loading , user);

  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;