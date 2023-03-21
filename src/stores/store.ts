import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import fieldsSlice from './fieldsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import currentSheetSlice from './currentSheetSlice';
import themeSlice from './themeSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(persistConfig, {
  fields: fieldsSlice,
  currentSheet: currentSheetSlice,
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
