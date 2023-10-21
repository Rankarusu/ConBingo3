import { CheckableBingoField } from '@/models/checkableBingoField';

export interface BingoSheet {
  id: number;
  fields: CheckableBingoField[];
}
