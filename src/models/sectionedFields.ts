import {BingoField} from './bingoField';

export type SectionTitle = 'Base Fields' | 'Custom Fields';

export type FieldSection = {
  title: SectionTitle;
  data: BingoField[];
};
