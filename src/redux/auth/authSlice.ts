import { getMe, login, logout, register, updateAvatar, updateUser } from './authActions';
import { AnyAction, createSlice } from '@reduxjs/toolkit';

import { IAuthState, IRejectedAction } from './authSlice.interface';

const isRejectedAction = (action: AnyAction): action is IRejectedAction =>
  action.type.startsWith('auth') && action.type.endsWith('rejected');

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isUpdating: false,
  isUpdated: false,
  isAvatarUpdating: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isUpdating = false;
      state.isUpdated = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
        state.isUpdated = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isUpdated = true;
        state.user = action.payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isAvatarUpdating = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isAvatarUpdating = false;
        state.user = action.payload;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
