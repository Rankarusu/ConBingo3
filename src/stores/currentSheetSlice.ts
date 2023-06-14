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
  alreadyLaunched: boolean;
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
  alreadyLaunched: false,
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
      const newSheet = generateSheet(action.payload);
      state.value = newSheet;
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
    setAlreadyLaunched: state => {
      state.alreadyLaunched = true;
    },
  },
});

export function useCurrentSheet() {
  const selectors = {
    currentSheet: useSelector((state: RootState) => state.currentSheet.value),
    win: useSelector((state: RootState) => state.currentSheet.win),
    alreadyLaunched: useSelector(
      (state: RootState) => state.currentSheet.alreadyLaunched,
    ),
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
  setAlreadyLaunched,
} = currentSheetSlice.actions;

export default currentSheetSlice.reducer;
