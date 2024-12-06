import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import dialogReducer from './slices/dialogSlice';
import selectorReducer from './slices/selectorSlice';
import { authApi } from './apis/authApi';
import { categoriesApi } from './apis/categoriesApi';
import { usersApi } from './apis/usersApi';
import { reviewsApi } from './apis/reviewsApi';
import { vouchersApi } from './apis/vouchersApi';
import { ordersApi } from './apis/ordersApi';
import { booksApi } from './apis/booksApi';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    selector: selectorReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [vouchersApi.reducerPath]: vouchersApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(usersApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(vouchersApi.middleware)
      .concat(ordersApi.middleware)
      .concat(booksApi.middleware)
});

setupListeners(store.dispatch);
