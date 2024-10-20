import { TOrder } from '@utils-types';
import {
  orderByNumber,
  orderCreate,
  orderHistory,
  orderReducer,
  resetOrder
} from './orderSlice';

describe('orderSlice tests', () => {
  type orderState = {
    data: TOrder | null;
    ingredients: string[];
    isLoading: boolean;
    success: boolean;
    request: boolean;
    orders: TOrder[];
    orderView: TOrder[];
  };

  const initialState: orderState = {
    data: null,
    ingredients: [],
    isLoading: true,
    success: false,
    request: false,
    orders: [],
    orderView: []
  };

  const stateWithOrder: orderState = {
    data: {
      _id: '671519b4d829be001c7774bb',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный антарианский бургер',
      createdAt: '2024-10-20T14:54:44.093Z',
      updatedAt: '2024-10-20T14:54:44.919Z',
      number: 57015
    },
    ingredients: [],
    isLoading: true,
    success: false,
    request: false,
    orders: [],
    orderView: []
  };

  const ingredients: string[] = [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941'
  ];
  const data = {
    _id: '671519b4d829be001c7774bb',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный антарианский бургер',
    createdAt: '2024-10-20T14:54:44.093Z',
    updatedAt: '2024-10-20T14:54:44.919Z',
    number: 57015
  };

  const orders = [data];

  it('resetOrder', () => {
    const actualState = orderReducer(stateWithOrder, resetOrder());
    const expectedState = { ...stateWithOrder, data: null };
    expect(actualState).toEqual(expectedState);
  });

  it('loading orderCreate', () => {
    const actualState = orderReducer(
      initialState,
      orderCreate.pending('', ingredients)
    );
    const expectedState = { ...initialState, isLoading: false, request: true };
    expect(actualState).toEqual(expectedState);
  });

  it('error orderCreate', () => {
    const actualState = orderReducer(
      initialState,
      orderCreate.rejected(new Error(), '', ingredients)
    );
    const expectedState = { ...initialState, isLoading: false };
    expect(actualState).toEqual(expectedState);
  });

  it('fulfilled orderCreate', () => {
    const actualState = orderReducer(
      initialState,
      orderCreate.fulfilled(
        {
          order: { ...data },
          success: true,
          name: 'Space флюоресцентный антарианский бургер'
        },
        '',
        ingredients
      )
    );
    const expectedState = {
      ...initialState,
      data: { ...data },
      isLoading: true,
      success: true,
      request: false
    };
    expect(actualState).toEqual(expectedState);
  });

  it('loading orderHistory', () => {
    const actualState = orderReducer(initialState, orderHistory.pending(''));
    const expectedState = { ...initialState, isLoading: false };
    expect(actualState).toEqual(expectedState);
  });

  it('error orderHistory', () => {
    const actualState = orderReducer(
      initialState,
      orderHistory.rejected(new Error(), '')
    );
    const expectedState = { ...initialState, isLoading: true };
    expect(actualState).toEqual(expectedState);
  });

  it('fulfiled orderHistory', () => {
    const actualState = orderReducer(
      initialState,
      orderHistory.fulfilled(orders, '')
    );
    const expectedState = { ...initialState, isLoading: true, orders: orders };
    expect(actualState).toEqual(expectedState);
  });

  it('loading orderByNumber', () => {
    const actualState = orderReducer(
      initialState,
      orderByNumber.pending('', 1)
    );
    const expectedState = { ...initialState, isLoading: false };
    expect(actualState).toEqual(expectedState);
  });

  it('error orderByNumber', () => {
    const actualState = orderReducer(
      initialState,
      orderByNumber.rejected(new Error(), '', 1)
    );
    const expectedState = { ...initialState, isLoading: true };
    expect(actualState).toEqual(expectedState);
  });

  it('fulfiled orderByNumber', () => {
    const actualState = orderReducer(
      initialState,
      orderByNumber.fulfilled({ orders: { ...orders }, success: true }, '', 1)
    );
    const expectedState = {
      ...initialState,
      isLoading: true,
      orderView: { ...orders }
    };
    expect(actualState).toEqual(expectedState);
  });
});
