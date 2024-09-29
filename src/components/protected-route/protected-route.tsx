import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import React from 'react';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.data); // userDataSelector — селектор получения пользователя из store
  if (!isLoading) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }
  const { from } = location.state || { from: { pathname: '/' } };

  if (!user.name) {
    // если пользователя в хранилище нет, то делаем редирект
    if (
      ['/login', '/forgot-password', '/reset-password'].includes(
        location.pathname
      )
    ) {
      return children;
    }
    return <Navigate replace to='/login' state={{ from: location }} />;
  } else {
    if (
      ['/login', '/forgot-password', '/reset-password'].includes(
        location.pathname
      )
    ) {
      return <Navigate to='/profile' />;
    }
  }

  return children;
};
