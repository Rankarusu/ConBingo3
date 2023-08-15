import {consoleTransport, fileAsyncTransport, logger} from 'react-native-logs';
import * as FileSystem from 'expo-file-system';
import {Platform} from 'react-native';

const now = new Date();
const y = now.getFullYear();
const m = (now.getMonth() + 1).toString().padStart(2, '0');
const d = now.getDate().toString().padStart(2, '0');

const fileName = `log_${y}-${m}-${d}.txt`;

const transport = [];
if (__DEV__) {
  transport.push(consoleTransport);
}
if (Platform.OS !== 'web') {
  transport.push(fileAsyncTransport);
}

const config = {
  severity: __DEV__ ? 'debug' : 'error',
  transport: transport,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transportOptions: {
    FS: FileSystem,
    fileName: fileName,
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
};

type LogLevels = keyof typeof config.levels;

export const Logger = logger.createLogger<LogLevels>(config);

async function getLogUris() {
  const files = await FileSystem.readDirectoryAsync(
    FileSystem.documentDirectory || '',
  );

  const logs = files
    .filter(item => item.includes('log_'))
    .sort((a, b) => b.localeCompare(a));
  return logs;
}

export async function getConcatenatedLog() {
  let res = '';
  const logs = await getLogUris();
  console.log(logs);

  for await (const file of logs) {
    const content = await FileSystem.readAsStringAsync(
      `${FileSystem.documentDirectory}/${file}`,
    );
    res += `\n${'-'.repeat(50)}\n`;
    res += file.replace(FileSystem.documentDirectory || '', '');
    res += '\n';
    // reverse so we have one chronologically sorted log stream
    res += content.split('\n').reverse().join('\n');
  }
  return res;
}

export async function deleteOldLogs() {
  Logger.debug('Cleaning up logs');
  const logs = await getLogUris();
  const logsToDelete = logs.slice(5);
  Logger.debug(`found ${logsToDelete.length} logs to delete`);

  for await (const file of logsToDelete) {
    Logger.debug(`deleting ${file}`);
    await FileSystem.deleteAsync(file);
  }
}
