import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BingoField} from '../models/bingoField';
import {RootState} from './store';
import defaultFields from '../data/defaultFields.json';
import {useSelector} from 'react-redux';

interface FieldsState {
  value: BingoField[];
  index: number;
}

interface UpdateBingoFieldPayload {
  id: number;
  options: Partial<BingoField>;
}

const initialState: FieldsState = {
  value: [],
  index: 0,
};

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<BingoField>) => {
      state.value.push(action.payload);
      state.index++;
    },
    removeField: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    updateField: (state, action: PayloadAction<UpdateBingoFieldPayload>) => {
      const idx = state.value.findIndex(item => item.id === action.payload.id);
      state.value[idx] = {...state.value[idx], ...action.payload.options};
    },
    resetFields: state => {
      state.value = defaultFields.map((field, index) => {
        state.index = index;
        return {id: index, text: field} as BingoField;
      });
    },
  },
});

export function useFields() {
  const selectors = {
    fields: useSelector((state: RootState) => state.fields.value),
  };
  return selectors;
}

export const {addField, removeField, updateField, resetFields} =
  fieldsSlice.actions;

export default fieldsSlice.reducer;
