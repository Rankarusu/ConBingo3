import {BingoField} from '../models/bingoField';
import {CheckableBingoField} from '../models/checkableBingoField';

export function generateSheet(fields: BingoField[]) {
  const indices = generateUniqueRandomNumbers(24, fields.length);
  const checkableFields = indices.map((index, position) => {
    return {
      text: fields[index].text,
      checked: false,
      position: position < 12 ? position : position + 1,
    } as CheckableBingoField;
  });
  //insert free space in the middle
  checkableFields.splice(12, 0, {
    text: 'FREE SPACE',
    checked: true,
    position: 12, //center
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
