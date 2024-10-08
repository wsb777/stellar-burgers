import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import React from 'react';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingridientId = useParams();
  const data = useSelector((state) =>
    state.ingridients.data.find((e) => e._id === ingridientId.id)
  );
  const ingredientData = data;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
