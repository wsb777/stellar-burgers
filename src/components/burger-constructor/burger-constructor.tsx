import { FC, useMemo } from 'react';
import React from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearStorage } from '../../slices/contructorSlice';
import { orderCreate, resetOrder } from '../../slices/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const location = useLocation();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.constructorBuild);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const orderData = useSelector((state) => state.order);
  const orderRequest = orderData.request;
  const success = orderData.success;
  const dispatch = useDispatch();
  const onOrderClick = () => {
    if (!isAuthChecked) {
      return navigate('/login', { state: { from: location } });
    }
    if (!constructorItems.bun || orderRequest) return;
    const data: string[] = [];
    data.push(constructorItems.bun._id);
    data.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach((e) => {
      data.push(e._id);
    });

    dispatch(orderCreate(data));
    if (success) {
      dispatch(clearStorage());
    }
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData.data}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
