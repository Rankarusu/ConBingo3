import {Logger} from './logger';

import * as DocumentPicker from 'expo-document-picker';

//TODO: change this to an actual json file once discord learned what that is and how to handle them
const MIME_TYPE = 'text/plain';

export const share = async <T>(data: T, fileName: string) => {
  const dataStr = JSON.stringify(data);

  const blobConfig = new Blob([dataStr], {type: MIME_TYPE});

  const blobUrl = URL.createObjectURL(blobConfig);

  // Create an a element with blob URL
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.target = '_blank';
  anchor.download = fileName;

  // Auto click on a element, trigger the file download
  anchor.click();

  URL.revokeObjectURL(blobUrl);
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
  const res = await file.assets[0].file?.text();
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
