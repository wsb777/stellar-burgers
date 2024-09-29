import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type orderState = {
  data: TOrder | null;
  ingridients: string[];
  isLoading: boolean;
  success: boolean;
  request: boolean;
  orders: TOrder[];
};

const initialState: orderState = {
  data: null,
  ingridients: [],
  isLoading: true,
  success: false,
  request: false,
  orders: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: {
      prepare: (payload: string[]) => ({
        payload: { ...payload }
      }),

      reducer: (state, action: PayloadAction<string[]>) => {
        state.ingridients = action.payload;
      }
    },
    resetOrder: {
      prepare: (payload?) => ({
        payload: { payload }
      }),

      reducer: (state) => {
        state.data = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.isLoading = false;
        state.request = true;
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload.order;
        localStorage.removeItem('ingridients');
        state.success = state.success;
        state.request = false;
      })
      .addCase(orderCreate.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(orderHistory.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(orderHistory.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orders = action.payload;
      })
      .addCase(orderHistory.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const orderCreate = createAsyncThunk(
  'order-ingridients',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const orderHistory = createAsyncThunk('order-history', async () => {
  const response = await getOrdersApi();
  return response;
});

export const { resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
