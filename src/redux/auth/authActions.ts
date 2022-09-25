import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/services/auth/authService';

import { errorCatch } from '@/utils/index';

import { ISettings, TypeLoginData, TypeRegisterData } from 'src/shared/types/authTypes';
import { IAvatar } from 'src/shared/types/avatar';

export const register = createAsyncThunk(
  'auth/register',
  async (userData: TypeRegisterData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      const message = errorCatch(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user: TypeLoginData, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', () => {
  authService.logout();
});

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    return await authService.getMe();
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk('auth/update', async (userData: ISettings, thunkAPI) => {
  try {
    return await authService.update(userData);
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (avatar: IAvatar | null, thunkAPI) => {
    try {
      return await authService.update({ avatar });
    } catch (error: any) {
      const message = errorCatch(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
