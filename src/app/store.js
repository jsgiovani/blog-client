import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import themeReucer from '../features/theme/themeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({
  user:userReducer,
  theme:themeReucer
});


const rootPersistConfig = {
  key: 'root',
  storage,
  version:1
};



const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export const persistor = persistStore(store);