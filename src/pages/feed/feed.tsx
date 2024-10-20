import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedThunk } from '../../slices/feedSlice';
import React from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.feed);
  const orders: TOrder[] = data.orders;
  useEffect(() => {
    dispatch(feedThunk());
  }, []);
  const handleUpdate = () => {
    dispatch(feedThunk());
  };

  if (isLoading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleUpdate} />;
};
