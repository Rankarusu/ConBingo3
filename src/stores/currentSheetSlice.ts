import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CheckableBingoField} from '../models/checkableBingoField';
import {winningRows} from '../utils/winningRows';
import {RootState} from './store';

interface CurrentSheetState {
  value: CheckableBingoField[];
  lastCheckedPos: number | null;
  win: boolean;
}

interface ToggleCheckedStatePayload {
  position: number;
  checked: boolean;
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
    set: (state, action: PayloadAction<CheckableBingoField[]>) => {
      state.value = action.payload;
    },
    toggleCheckedState: (
      state,
      action: PayloadAction<ToggleCheckedStatePayload>,
    ) => {
      const {position, checked} = action.payload;
      state.value[position].checked = checked;

      const checkedIds = state.value
        .filter(item => item.checked === true)
        .map(item => item.position);

      state.win = checkWin(position, checkedIds);
    },
    resetWin: state => {
      state.win = false;
    },
  },
});

export const selectCurrentSheet = (state: RootState) =>
  state.currentSheet.value;

export const selectWin = (state: RootState) => state.currentSheet.win;

export const {set, toggleCheckedState, resetWin} = currentSheetSlice.actions;

export default currentSheetSlice.reducer;
