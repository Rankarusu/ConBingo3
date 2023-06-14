import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BingoField} from '../models/bingoField';
import {RootState} from './store';
import defaultFields from '../data/defaultFields.json';

interface FieldsState {
  value: BingoField[];
}

interface UpdateBingoFieldPayload {
  id: number;
  options: Partial<BingoField>;
}

const initialState: FieldsState = {
  value: [],
};

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<BingoField>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    update: (state, action: PayloadAction<UpdateBingoFieldPayload>) => {
      const idx = state.value.findIndex(item => item.id === action.payload.id);
      state.value[idx] = {...state.value[idx], ...action.payload.options};
    },
    reset: state => {
      state.value = defaultFields.map((field, index) => {
        return {id: index, text: field} as BingoField;
      });
    },
  },
});

export const selectFields = (state: RootState) => state.fields.value;

export const {add, remove, update, reset} = fieldsSlice.actions;

export default fieldsSlice.reducer;
