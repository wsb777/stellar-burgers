import { combineReducers } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { constructorReducer } from '../slices/contructorSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { feedReducer } from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import { orderReducer } from '../slices/orderSlice';
import store from '../services/store';

// jest.mock('../slices/ingredientsSlice/getIngredientsApi');

describe('rootReducer tests', () => {
  it('rootReducer init', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual(store.getState());
  });
});
