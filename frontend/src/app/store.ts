import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice';
import configReducer from '../slices/ConfigSlice';
import homeReducer from '../slices/HomeSlice';
import postReducer from '../slices/PostSlice';

import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage: AsyncStorage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      config: configReducer,
      home: homeReducer,
      post: postReducer,
    })
  ),
});

export const persistor = persistStore(store);
export { PersistGate };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
