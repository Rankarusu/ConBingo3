import {BingoField} from '../models/bingoField';
import {CheckableBingoField} from '../models/checkableBingoField';

export function generateSheet(fields: BingoField[]) {
  const indices = generateUniqueRandomNumbers(24, fields.length);
  const checkableFields = indices.map((index, position) => {
    return {
      id: fields[index].id,
      text: fields[index].text,
      position,
      checked: false,
    } as CheckableBingoField;
  });
  //insert free space in the middle
  checkableFields.splice(12, 0, {
    id: NaN,
    text: 'FREE SPACE',
    position: 12,
    checked: true,
  } as CheckableBingoField);
  return checkableFields;
}

function generateUniqueRandomNumbers(limit: number, range: number) {
  if (range === 0) {
    throw new Error('range cannot be 0');
  }
  const numbers = new Set<number>();
  while (numbers.size < limit) {
    const randomNumber = Math.floor(Math.random() * range);
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}
