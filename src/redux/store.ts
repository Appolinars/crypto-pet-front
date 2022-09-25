import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '@/services/crypto/cryptoService';
import { uploadApi } from '@/services/upload/uploadService';

import authReducer from './auth/authSlice';
import noteReducer from './note/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, uploadApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
