import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import React from 'react';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.data); // userDataSelector — селектор получения пользователя из store
  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const background = location.state?.from?.background || null;
    return <Navigate replace to={from} state={{ background }} />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }

  return children;
};
