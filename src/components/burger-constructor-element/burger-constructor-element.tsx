import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { deleteIngridient, moveIngrident } from '../../slices/contructorSlice';
import React from 'react';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveIngrident({ index: index, side: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngrident({ index: index, side: 'up' }));
    };

    const handleClose = () => {
      dispatch(deleteIngridient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
