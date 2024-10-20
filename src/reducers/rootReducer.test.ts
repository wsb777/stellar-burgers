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
    const state = rootReducer({...store.getState}, initAction);
    expect(state).toEqual({
      constructorBuild: constructorReducer(undefined, initAction),
      ingredients: ingredientsReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      user: userReducer(undefined, initAction),
      order: orderReducer(undefined, initAction)
    });
  });
});
