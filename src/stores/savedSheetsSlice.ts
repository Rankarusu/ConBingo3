import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BingoSheet} from '../models/bingoSheet';
import {RootState} from './store';

interface SavedSheetsState {
  value: BingoSheet[];
}

const initialState: SavedSheetsState = {
  value: [],
};

export const savedSheetsSlice = createSlice({
  name: 'savedSheets',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<BingoSheet>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    clear: state => {
      state.value = [];
    },
  },
});

export const selectSavedSheets = (state: RootState) => state.savedSheets.value;

export const {add, remove, clear} = savedSheetsSlice.actions;

export default savedSheetsSlice.reducer;
