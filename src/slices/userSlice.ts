import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

type userState = {
  data: TUser;
  isLoading: boolean;
  isAuthChecked: boolean;
  success: boolean;
  password: string;
};

const initialState: userState = {
  data: {
    email: '',
    name: ''
  },
  password: '',
  isAuthChecked: false,
  isLoading: true,
  success: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(userRegisterThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(userRegisterThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(userLoginThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(authTokenThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(authTokenThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthChecked = true;
        state.isLoading = true;
      })
      .addCase(authTokenThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.success = action.payload.success;
        state.data.email = '';
        state.data.name = '';
        state.isAuthChecked = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(resetProfile.pending, (state) => {})
      .addCase(resetProfile.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(resetProfile.rejected, (state, action) => {});
  }
});

export const userRegisterThunk = createAsyncThunk<TUser, TRegisterData>(
  'user-register',
  async (data, { rejectWithValue }) => {
    const response = await registerUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const userLoginThunk = createAsyncThunk<TUser, TLoginData>(
  'user-login',
  async (data) => {
    const response = await loginUserApi(data);
    const { user, refreshToken, accessToken } = response;
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);
    return user;
  }
);

export const authTokenThunk = createAsyncThunk<TUser>('auth-user', async () => {
  const response = await getUserApi();
  const { user } = response;
  return user;
});

export const logoutThunk = createAsyncThunk('user-logout', async () => {
  const response = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return response;
});

export const resetProfile = createAsyncThunk(
  'reset-user',
  async (user: TRegisterData) => {
    const response = await updateUserApi(user);
    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  'forgot-password',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const userReducer = userSlice.reducer;
