import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import defaultFields from '../data/defaultFields.json';
import {BingoField} from '../models/bingoField';
import {RootState} from './store';

interface FieldsState {
  value: BingoField[];
  index: number;
}

type UpdateBingoFieldPayload = BingoField;

const initialState: FieldsState = {
  value: [],
  index: 0,
};

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<string>) => {
      state.index++;
      state.value.push({id: state.index, text: action.payload});
    },
    removeField: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    updateField: (state, action: PayloadAction<UpdateBingoFieldPayload>) => {
      const {id, text} = action.payload;
      const idx = state.value.findIndex(item => item.id === id);
      state.value[idx].text = text;
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
    sortedFields: useSelector((state: RootState) => {
      //we don't wanna mutate the state here. [...] copies
      const sorted = [...state.fields.value].sort((a, b) =>
        a.text.localeCompare(b.text),
      );
      return sorted;
    }),
    fieldById: (id: number) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSelector((state: RootState) =>
        state.fields.value.find(field => field.id === id),
      ),
  };
  return selectors;
}

export const {addField, removeField, updateField, resetFields} =
  fieldsSlice.actions;

export default fieldsSlice.reducer;
