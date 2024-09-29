import React from 'react';
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { AppDispatch, useDispatch } from '../../services/store';
import { userLoginThunk } from '../../slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const data = { email, password };
  const location = useLocation();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userLoginThunk(data)).then(() => {
      if (location.state.from.state.from === '/login') {
        return navigate('/profile');
      }
      return navigate(location.state.from.state.from);
    });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
