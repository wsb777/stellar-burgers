import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/protected-route';
import { authTokenThunk } from '../../slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const clickModalClose = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(authTokenThunk());
  });
  let background = location.state && location.state.background;

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path='/register' element={<Register />} />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          >
            {' '}
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={'Детали заказа'}
                  onClose={clickModalClose}
                  children={<OrderInfo />}
                />
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={'Детали заказа'}
                  onClose={clickModalClose}
                  children={<OrderInfo />}
                />
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title={'Детали ингредиента'}
                  onClose={clickModalClose}
                  children={<IngredientDetails />}
                />
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
