import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    add: (state, action: PayloadAction<CheckableBingoField[]>) => {
      state.value.push({id: state.index, fields: action.payload});
      state.index++;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    clear: state => {
      state.value = [];
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.selectedSheetIndex = action.payload;
    },
  },
});

export const selectSavedSheets = (state: RootState) => state.savedSheets.value;
export const selectSelectedSheetIndex = (state: RootState) =>
  state.savedSheets.selectedSheetIndex;

export const {add, remove, clear, setIndex} = savedSheetsSlice.actions;

export default savedSheetsSlice.reducer;
