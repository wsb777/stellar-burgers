import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import React from 'react';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientId = useParams();
  const data = useSelector((state) =>
    state.ingredients.data.find((e) => e._id === ingredientId.id)
  );
  const ingredientData = data;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
