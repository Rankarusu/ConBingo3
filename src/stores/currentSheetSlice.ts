import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CheckableBingoField} from '../models/checkableBingoField';
import {winningRows} from '../utils/winningRows';
import {RootState} from './store';
import {useSelector} from 'react-redux';
import {generateSheet} from '../utils/generateSheet';
import {BingoField} from '../models/bingoField';

interface CurrentSheetState {
  value: CheckableBingoField[];
  lastCheckedPos: number | null;
  win: boolean;
}

interface ToggleCheckedStatePayload {
  position: number;
  checked: boolean;
}

interface UpdateBingoFieldPayload {
  position: number;
  text: string;
}

const initialState: CurrentSheetState = {
  value: [],
  lastCheckedPos: null,
  win: false,
};

const checkWin = (pos: number, checkedPos: number[]) => {
  const result = winningRows
    .filter(row => row.every(entry => checkedPos.includes(entry)))
    .find(arr => arr.includes(pos)); // see if the newly selected field is in the winning row
  return !!result;
};

export const currentSheetSlice = createSlice({
  name: 'currentSheet',
  initialState,
  reducers: {
    setCurrentSheet: (state, action: PayloadAction<CheckableBingoField[]>) => {
      state.value = action.payload;
    },
    resetCurrentSheet: (state, action: PayloadAction<BingoField[]>) => {
      state.value = generateSheet(action.payload);
    },
    toggleCheckedField: (
      state,
      action: PayloadAction<ToggleCheckedStatePayload>,
    ) => {
      const {position, checked} = action.payload;
      state.value[position].checked = checked;

      const checkedIds = state.value.reduce((a: number[], curr, index) => {
        if (curr.checked) {
          a.push(index);
        }
        return a;
      }, []);

      state.win = checkWin(position, checkedIds);
    },
    updateCurrentSheetField: (
      state,
      action: PayloadAction<UpdateBingoFieldPayload>,
    ) => {
      const {position, text} = action.payload;
      state.value[position].text = text;
    },
    resetWin: state => {
      state.win = false;
    },
  },
});

export function useCurrentSheet() {
  const selectors = {
    currentSheet: useSelector((state: RootState) => state.currentSheet.value),
    win: useSelector((state: RootState) => state.currentSheet.win),
    fieldByPosition: (position: number) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSelector((state: RootState) => state.currentSheet.value[position]),
  };
  return selectors;
}

export const {
  setCurrentSheet,
  resetCurrentSheet,
  toggleCheckedField,
  updateCurrentSheetField,
  resetWin,
} = currentSheetSlice.actions;

export default currentSheetSlice.reducer;
