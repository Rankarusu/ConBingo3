import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {
  createMigrate,
  FLUSH,
  MigrationManifest,
  PAUSE,
  PERSIST,
  persistCombineReducers,
  PersistedState,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import currentSheetSlice from './currentSheetSlice';
import fieldsSlice from './fieldsSlice';
import savedSheetsSlice from './savedSheetsSlice';
import themeSlice from './themeSlice';
import defaultFields from '../data/defaultFields.json';
import {CheckableBingoField} from '../models/checkableBingoField';
import {BingoField} from '../models/bingoField';
import selectedFieldsSlice from './selectedFieldsSlice';

const migrations: MigrationManifest = {
  0: (state: any) => {
    return state;
  },
  1: (state: any) => {
    // with the introduction of duplicate checks we persist the position of fields, therefore we need to add that prop to the current sheet
    state.currentSheet.value = state.currentSheet.value.map(
      (field: CheckableBingoField, index: number) => {
        return {
          ...field,
          position: index,
        };
      },
    );
    return state;
  },
  2: (state: any) => {
    // with the introduction of separate sections for fields we need to add the isCustom flag to existing fields
    state.fields.value = state.fields.value.map((field: BingoField) => {
      return {
        ...field,
        isCustom: !defaultFields.includes(field.text),
      };
    });
    return state;
  },
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 2,
  migrate: createMigrate(migrations, {debug: __DEV__}),
  blacklist: ['selectedFields'], // it's handy to put into redux, but we don't need to persist it.
};

const reducer = persistCombineReducers(persistConfig, {
  fields: fieldsSlice,
  currentSheet: currentSheetSlice,
  savedSheets: savedSheetsSlice,
  theme: themeSlice,
  selectedFields: selectedFieldsSlice,
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
