import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type ingredientsState = {
  data: TIngredient[];
  isLoading: boolean;
};

const initialState: ingredientsState = {
  data: [],
  isLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
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
    builder.addCase(ingredientsThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(ingredientsThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(ingredientsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
  }
});

export const ingredientsThunk = createAsyncThunk('ingredients', async () =>
  getIngredientsApi()
);
export const { getIngridientById } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
