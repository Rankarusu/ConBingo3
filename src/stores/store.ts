import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistCombineReducers,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import currentSheetSlice from './currentSheetSlice';
import fieldsSlice from './fieldsSlice';
import savedSheetsSlice from './savedSheetsSlice';
import themeSlice from './themeSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(persistConfig, {
  fields: fieldsSlice,
  currentSheet: currentSheetSlice,
  savedSheets: savedSheetsSlice,
  theme: themeSlice,
});

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
