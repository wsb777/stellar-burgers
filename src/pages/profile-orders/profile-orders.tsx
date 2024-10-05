import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { orderHistory } from '../../slices/orderSlice';
import { Preloader } from '@ui';
import React from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderHistory());
  });
  const data = useSelector((state) => state.order);
  const orders: TOrder[] = data.orders;
  if (data.isLoading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
