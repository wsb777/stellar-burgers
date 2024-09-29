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
import { useDispatch } from 'react-redux';
import { ingridientsThunk } from '../../slices/ingridientsSlice';
import { AppDispatch } from '../../services/store';
import { feedThunk } from '../../slices/feedSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { authTokenThunk } from '../../slices/userSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(ingridientsThunk());
    dispatch(feedThunk());
  }, []);
  const clickModalClose = () => {
    navigate(-1);
  };
  dispatch(authTokenThunk());
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
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
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Детали заказа'} onClose={clickModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={clickModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
