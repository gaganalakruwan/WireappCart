import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import productReducer from './product/productSlice';
import cartSlice from './cart/cartSlice';

const cartConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const cartReducer = persistReducer(cartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
