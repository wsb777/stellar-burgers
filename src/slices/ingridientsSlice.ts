import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type ingridientsState = {
  data: TIngredient[];
  isLoading: boolean;
};

const initialState: ingridientsState = {
  data: [],
  isLoading: true
};

const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getIngridientById: (state, action: PayloadAction<string | undefined>) => {
      state.data.find((element) => {
        element._id === action.payload;
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ingridientsThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(ingridientsThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(ingridientsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
  }
});

export const ingridientsThunk = createAsyncThunk('ingridients', async () =>
  getIngredientsApi()
);
export const { getIngridientById } = ingridientsSlice.selectors;
export const ingridientsReducer = ingridientsSlice.reducer;
