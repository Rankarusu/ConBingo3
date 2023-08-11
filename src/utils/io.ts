import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {CheckableBingoField} from '../models/checkableBingoField';
import {Logger} from './logger';

const FILE_NAME = 'bingo-sheet.txt';
const FILE_PATH = RNFS.CachesDirectoryPath + '/' + FILE_NAME;
const FILE_URL = 'file://' + FILE_PATH;
//TODO: change this to an actual json file once discord learned what that is and how to handle them
const MIME_TYPE = 'text/plain';

const bingoSheetRegex =
  /^\[(?:(?:{"text":"(?:.*?)","checked":(?:true|false)(?:,"position":(?:[0-9]|1[0-9]|2[0-3]))?},){24}(?:{"text":"(?:.*?)","checked":(?:true|false)(?:,"position":24)?}))\]$/;

const exportedFieldsRegex = /^\[(?:".{3,64}",)+(?:".{3,64}")\]$/; //literally just a string array with lengths between 3 and 64

export const share = async (sheet: CheckableBingoField[]) => {
  const sheetStr = JSON.stringify(sheet);
  await RNFS.writeFile(FILE_PATH, sheetStr, 'utf8');

  await Share.open({
    filename: FILE_NAME,
    url: FILE_URL,
    type: MIME_TYPE,
  }).catch(error => Logger.warn(error));
};

export const shareLog = async (text: string) => {
  await RNFS.writeFile(
    RNFS.CachesDirectoryPath + '/conbingo-log.txt',
    text,
    'utf8',
  );
  await Share.open({
    filename: 'conbingo-log.txt',
    url: 'file://' + RNFS.CachesDirectoryPath + '/conbingo-log.txt',
    type: 'text/plain',
  }).catch(error => Logger.warn(error));
};

const pickFile = async () => {
  let file;
  try {
    file = await DocumentPicker.pickSingle({
      type: MIME_TYPE,
      mode: 'import',
      presentationStyle: 'fullScreen',
    });
  } catch (error) {
    //this throws when user cancels the document picker
    Logger.warn(error);
  }

  if (!file) {
    return;
  }

  const res = await RNFS.readFile(file.uri);
  return res;
};

export const loadSheetFromFile = async () => {
  const sheet = await pickFile();
  if (!sheet) {
    return;
  }

  if (!bingoSheetRegex.test(sheet)) {
    throw new Error('File content is not a valid bingo sheet.');
  }

  const jsonSheet = JSON.parse(sheet);
  return jsonSheet as CheckableBingoField[];
};

export const loadFieldsFromFile = async () => {
  const fields = await pickFile();
  if (!fields) {
    return;
  }

  if (!exportedFieldsRegex.test(fields)) {
    throw new Error('File content is not valid list of fields');
  }

  const jsonFields = JSON.parse(fields);
  return jsonFields as string[];
};
