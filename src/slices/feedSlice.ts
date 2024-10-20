import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type orderState = {
  data: TOrdersData;
  isLoading: boolean;
};

const initialState: orderState = {
  data: {
    orders: [],
    total: NaN,
    totalToday: NaN
  },
  isLoading: false
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(feedThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(feedThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(feedThunk.pending, (state, action) => {
      state.isLoading = true;
    });
  }
});

export const feedThunk = createAsyncThunk('feed', async () => getFeedsApi());

export const feedReducer = feedSlice.reducer;
