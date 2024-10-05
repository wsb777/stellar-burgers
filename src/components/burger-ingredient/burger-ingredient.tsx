import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { AppDispatch, useDispatch } from '../../services/store';
import { addIngridient } from '../../slices/contructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    let location = useLocation();
    const dispatch = useDispatch();
    const handleAdd = () => {
      dispatch(addIngridient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
