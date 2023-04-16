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

const fieldsJsonRegex =
  /^\[(({"text":"(.*?)","checked":(true|false)},){24}({"text":"(.*?)","checked":(true|false)}))\]$/;

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

export const load = async () => {
  let file;
  try {
    file = await DocumentPicker.pickSingle({
      type: MIME_TYPE,
      mode: 'import',
      presentationStyle: 'fullScreen',
    });
  } catch (error) {
    //this throws when use cancels the document picker
    Logger.warn(error);
  }

  if (!file) {
    return;
  }

  const res = await RNFS.readFile(file.uri);

  if (!fieldsJsonRegex.test(res)) {
    throw new Error('File content is not a valid bingo sheet.');
  }

  const jsonField = JSON.parse(res);
  return jsonField as CheckableBingoField[];
};
