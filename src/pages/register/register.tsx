import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch, useDispatch } from '../../services/store';
import { userRegisterThunk } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const data = { name: userName, email: email, password: password };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch(userRegisterThunk(data));
      navigate('/profile');
    } catch {}
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
