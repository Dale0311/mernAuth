import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return <>{!currentUser ? <Navigate to={'/signin'} /> : <Outlet />} </>;
}

export default PrivateRoute;
