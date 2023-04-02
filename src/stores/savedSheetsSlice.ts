import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {BingoSheet} from '../models/bingoSheet';
import {CheckableBingoField} from '../models/checkableBingoField';
import {RootState} from './store';

interface SavedSheetsState {
  value: BingoSheet[];
  index: number;
  selectedSheetIndex: number;
}

const initialState: SavedSheetsState = {
  value: [],
  index: 0,
  selectedSheetIndex: 0,
};

export const savedSheetsSlice = createSlice({
  name: 'savedSheets',
  initialState,
  reducers: {
    addSheet: (state, action: PayloadAction<CheckableBingoField[]>) => {
      state.value.push({id: state.index, fields: action.payload});
      state.index++;
    },
    removeSheet: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    clearSheets: state => {
      state.value = [];
    },
    setSelectedSheet: (state, action: PayloadAction<number>) => {
      state.selectedSheetIndex = action.payload;
    },
  },
});

export function useSavedSheets() {
  const selectors = {
    savedSheets: useSelector((state: RootState) => state.savedSheets.value),
    selectedSheet: useSelector((state: RootState) =>
      state.savedSheets.value.find(item => item.id === state.savedSheets.index),
    ),
    selectedSheetIndex: useSelector(
      (state: RootState) => state.savedSheets.selectedSheetIndex,
    ),
  };
  return selectors;
}

export const {addSheet, removeSheet, clearSheets, setSelectedSheet} =
  savedSheetsSlice.actions;

export default savedSheetsSlice.reducer;
