import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storeReducer from "./reducers/store";
import userReducer from "./reducers/user";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const Reducer = combineReducers({ storeReducer, userReducer });


const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, Reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools:false
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
