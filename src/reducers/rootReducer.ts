import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { constructorReducer } from '../slices/contructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import { orderReducer } from '../slices/orderSlice';

export const rootReducer = combineReducers({
  constructorBuild: constructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer
});
