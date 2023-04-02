import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {CheckableBingoField} from '../models/checkableBingoField';

const FILE_NAME = 'bingo-sheet.txt';
const FILE_PATH = RNFS.CachesDirectoryPath + '/' + FILE_NAME;
const FILE_URL = 'file://' + FILE_PATH;
//TODO: change this to an actual json file once discord learned what that is and how to handle them
const MIME_TYPE = 'text/plain';

export const share = async (sheet: CheckableBingoField[]) => {
  const sheetStr = JSON.stringify(sheet);
  await RNFS.writeFile(FILE_PATH, sheetStr, 'utf8');

  console.log('saved');
  await Share.open({
    filename: FILE_NAME,
    url: FILE_URL,
    type: MIME_TYPE,
  });
};

export const load = async () => {
  const file = await DocumentPicker.pickSingle({
    type: MIME_TYPE,
    mode: 'import',
    presentationStyle: 'fullScreen',
  });
  const res = await RNFS.readFile(file.uri);
  console.log(res);
  return file;
};
