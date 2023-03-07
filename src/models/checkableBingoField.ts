import {BingoField} from './bingoField';

export interface CheckableBingoField extends BingoField {
  checked: boolean;
  position: number;
}
