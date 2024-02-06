import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({ user: userReducer });
const persistedReducer = persistReducer(
  { key: 'root', storage, version: 1 },
  rootReducer
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
