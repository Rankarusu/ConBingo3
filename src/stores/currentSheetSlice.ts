import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CheckableBingoField} from '../models/checkableBingoField';
import {RootState} from './store';

interface CurrentSheetState {
  value: CheckableBingoField[];
}

interface ToggleCheckedStatePayload {
  position: number;
  checked: boolean;
}

const initialState: CurrentSheetState = {
  value: [],
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
    },
  },
});

export const selectCurrentSheet = (state: RootState) =>
  state.currentSheet.value;

export const {set, toggleCheckedState} = currentSheetSlice.actions;

export default currentSheetSlice.reducer;
