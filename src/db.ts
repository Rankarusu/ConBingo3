import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultFields from './data/defaultFields.json';
import {BingoField} from './models/bingoField';

export class FieldsRepository {
  storageKey = '@fields';
  currentIndex = 0;

  async getAll() {
    await this.reset(); //TODO: remove this
    const str = await AsyncStorage.getItem(this.storageKey);
    const fields: BingoField[] = JSON.parse(str!);
    return fields;
  }

  private async setAll(fields: BingoField[]) {
    await AsyncStorage.setItem(this.storageKey, JSON.stringify(fields));
  }

  async add(field: string) {
    const fields = await this.getAll();
    fields.push({id: 0, text: field});
    await this.setAll(fields);
  }

  async reset() {
    let highestIndex = 0;
    const fields = defaultFields.map((field, index) => {
      highestIndex = index;
      return {
        id: index,
        text: field,
      } as BingoField;
    });
    await this.setAll(fields);
    this.currentIndex = highestIndex;
  }

  async findOneById(id: number) {
    const fields = await this.getAll();
    const wantedItem = fields.find(field => field.id === id);
    return wantedItem;
  }

  async deleteById(id: number) {
    const fields = await this.getAll();
    const filteredFields = fields.filter(field => field.id !== id);
    await this.setAll(filteredFields);
  }

  async updateOneById(id: number, options: Partial<BingoField>) {
    const fields = await this.getAll();
    const wantedIdx = fields.findIndex(field => field.id === id);
    fields[wantedIdx] = {...fields[wantedIdx], ...options};
    await this.setAll(fields);
  }
}
