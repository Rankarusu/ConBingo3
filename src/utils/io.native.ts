import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {Logger} from './logger';

import * as DocumentPicker from 'expo-document-picker';

//TODO: change this to an actual json file once discord learned what that is and how to handle them
const MIME_TYPE = 'text/plain';

export const bingoSheetRegex =
  /^\[(?:(?:{"text":"(?:.*?)","checked":(?:true|false)(?:,"position":(?:[0-9]|1[0-9]|2[0-3]))?},){24}(?:{"text":"(?:.*?)","checked":(?:true|false)(?:,"position":24)?}))\]$/;

export const exportedFieldsRegex = /^\[(?:".{3,64}",)+(?:".{3,64}")\]$/; //literally just a string array with lengths between 3 and 64

export const share = async <T>(data: T, fileName: string) => {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) {
    Logger.warn('The sharing API is not available on this device.');
    return;
  }
  const dataStr = JSON.stringify(data);
  const filePath = `${FileSystem.cacheDirectory}/${fileName}`;
  await FileSystem.writeAsStringAsync(filePath, dataStr, {encoding: 'utf8'});
  Logger.debug(`Attempting to share file ${filePath}`);
  await Sharing.shareAsync(filePath, {
    mimeType: MIME_TYPE,
    dialogTitle: fileName,
  }).catch(error => Logger.warn(error));
};

const pickFile = async () => {
  let file;
  try {
    file = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: MIME_TYPE,
    });
  } catch (error) {
    //this throws when user cancels the document picker
    Logger.warn(error);
  }
  if (file?.canceled || !file?.assets) {
    return;
  }
  const res = await FileSystem.readAsStringAsync(file.assets[0].uri);
  return res;
};

export const loadAndValidate = async <T>(validationRegex: RegExp) => {
  const file = await pickFile();
  if (!file) {
    return;
  }
  if (!validationRegex.test(file)) {
    throw new Error('File content not valid');
  }
  return JSON.parse(file) as T;
};
