import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import defaultFields from '../data/defaultFields.json';
import {BingoField} from '../models/bingoField';
import {FieldSection} from '../models/sectionedFields';
import {Logger} from '../utils/logger';
import {RootState} from './store';

interface FieldsState {
  value: BingoField[];
  index: number;
}

type UpdateBingoFieldPayload = BingoField;

type AddBingoFieldPayload = Omit<BingoField, 'id'>;

const initialState: FieldsState = {
  value: [],
  index: 0,
};

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<AddBingoFieldPayload>) => {
      const {text, isCustom} = action.payload;
      const newField = {
        id: state.index,
        text,
        isCustom,
      } as BingoField;
      state.value.push(newField);
      state.index++;
      Logger.debug(`field added: ${JSON.stringify(newField)}`);
    },

    addFields: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(text => {
        const newField = {
          id: state.index,
          text,
          isCustom: true,
        } as BingoField;
        state.value.push(newField);
        state.index++;
      });
      Logger.debug(`fields added: ${JSON.stringify(action.payload)}`);
    },

    removeFields: (state, action: PayloadAction<number | number[]>) => {
      const idsToDelete = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.value = state.value.filter(item => !idsToDelete.includes(item.id));
      Logger.debug(`field ${action.payload} removed`);
    },

    updateField: (state, action: PayloadAction<UpdateBingoFieldPayload>) => {
      const {id, text, isCustom} = action.payload;
      const idx = state.value.findIndex(item => item.id === id);
      if (state.value[idx].text === text) {
        // in case you just open the modal and close it via save, we don't want the field to go to custom fields
        return;
      }
      state.value[idx].text = text;
      state.value[idx].isCustom = isCustom;
      Logger.debug(`field ${id} updated: ${text}`);
    },

    resetFields: state => {
      state.value = defaultFields.map((field, index) => {
        return {id: index, text: field, isCustom: false} as BingoField;
      });
      state.index = defaultFields.length;
      Logger.info('fields reset');
    },
  },
});

export function useFields() {
  // we put this here to memoize the expensive sorting computation and eliminate the warning for it
  const sortedFields = createSelector(
    [(state: RootState) => state.fields.value],
    fields => {
      //we don't wanna mutate the state here. [...] copies
      const sorted = [...fields].sort((a, b) => a.text.localeCompare(b.text));
      return sorted;
    },
  );

  // to display custom fields separate from base fields, we need to get the data into a specific
  // form to use with a SectionedList Component
  const sectionedFields = createSelector(
    [(state: RootState) => state.fields.value],
    fields => {
      const sorted = [...fields].sort((a, b) => a.text.localeCompare(b.text));

      const base: FieldSection = {title: 'Base Fields', data: []};
      const custom: FieldSection = {title: 'Custom Fields', data: []};
      sorted.forEach(field => {
        if (field.isCustom) {
          custom.data.push(field);
        } else {
          base.data.push(field);
        }
      });

      // don't display custom fields section if there are none
      return [base, custom].filter(
        section => section.data.length > 0,
      ) as FieldSection[];
    },
  );

  const selectors = {
    fields: useSelector((state: RootState) => state.fields.value),
    sortedFields: useSelector(sortedFields),
    sectionedFields: useSelector(sectionedFields),
    fieldById: (id: number) =>
      useSelector((state: RootState) =>
        state.fields.value.find(field => field.id === id),
      ),
  };
  return selectors;
}

export const {addField, addFields, removeFields, updateField, resetFields} =
  fieldsSlice.actions;

export default fieldsSlice.reducer;
