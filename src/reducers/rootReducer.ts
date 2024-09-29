import { combineReducers } from '@reduxjs/toolkit';
import { ingridientsReducer } from '../slices/ingridientsSlice';
import { constructorReducer } from '../slices/contructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import { orderReducer } from '../slices/orderSlice';

export const rootReducer = combineReducers({
  constructorBuild: constructorReducer,
  ingridients: ingridientsReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer
});
