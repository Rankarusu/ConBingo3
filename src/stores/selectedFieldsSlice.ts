import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { RootState } from '@/stores/store';
import { Logger } from '@/utils/logger';

interface SelectedFieldsState {
  value: number[];
  multiSelectModeEnabled: boolean;
}

const initialState: SelectedFieldsState = {
  value: [],
  multiSelectModeEnabled: false,
};

export const selectedFieldsSlice = createSlice({
  name: 'selectedFields',
  initialState,
  reducers: {
    addSelectedField: (state, action: PayloadAction<number>) => {
      state.value.push(action.payload);
      Logger.debug(`field ${action.payload} selected`);
    },

    removeSelectedField: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item) => item !== action.payload);
      Logger.debug(`field ${action.payload} deselected`);
    },

    resetSelectedFields: (state) => {
      state.value = [];
      Logger.info('selected fields reset');
    },

    setMultiselectMode: (state, action: PayloadAction<boolean>) => {
      state.multiSelectModeEnabled = action.payload;
    },
  },
});

export function useSelectedFields() {
  const selectors = {
    selectedFields: useSelector(
      (state: RootState) => state.selectedFields.value,
    ),
    multiSelectModeEnabled: useSelector(
      (state: RootState) => state.selectedFields.multiSelectModeEnabled,
    ),
  };
  return selectors;
}

export const {
  addSelectedField,
  removeSelectedField,
  resetSelectedFields,
  setMultiselectMode,
} = selectedFieldsSlice.actions;

export default selectedFieldsSlice.reducer;
