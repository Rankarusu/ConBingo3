import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { BingoSheet } from '@/models/bingoSheet';
import { CheckableBingoField } from '@/models/checkableBingoField';
import { RootState } from '@/stores/store';
import { Logger } from '@/utils/logger';

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
      const newSheet = {
        id: state.index,
        fields: action.payload,
      } as BingoSheet;
      state.value.push(newSheet);
      state.index++;
      Logger.debug(`sheet added: ${JSON.stringify(newSheet)}`);
    },

    removeSheet: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
      Logger.debug(`sheet ${action.payload} removed`);
    },

    setSelectedSheet: (state, action: PayloadAction<number>) => {
      state.selectedSheetIndex = action.payload;
      Logger.debug(`set selected sheet: ${action.payload}`);
    },
  },
});

export function useSavedSheets() {
  const selectors = {
    savedSheets: useSelector((state: RootState) => state.savedSheets.value),
    selectedSheet: useSelector((state: RootState) =>
      state.savedSheets.value.find(
        (item) => item.id === state.savedSheets.selectedSheetIndex,
      ),
    ),
    selectedSheetIndex: useSelector(
      (state: RootState) => state.savedSheets.selectedSheetIndex,
    ),
  };
  return selectors;
}

export const { addSheet, removeSheet, setSelectedSheet } =
  savedSheetsSlice.actions;

export default savedSheetsSlice.reducer;
