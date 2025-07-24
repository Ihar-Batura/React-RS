import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from './selectedItemsSlice';
import { characterApi } from './apiSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
    [characterApi.reducerPath]: characterApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
