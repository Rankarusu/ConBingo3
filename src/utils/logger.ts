import {consoleTransport, fileAsyncTransport, logger} from 'react-native-logs';
import RNFS from 'react-native-fs';

const now = new Date();
const y = now.getFullYear();
const m = (now.getMonth() + 1).toString().padStart(2, '0');
const d = now.getDate().toString().padStart(2, '0');

const fileName = `log_${y}-${m}-${d}.txt`;

const config = {
  severity: __DEV__ ? 'debug' : 'error',
  transport: __DEV__
    ? [consoleTransport, fileAsyncTransport]
    : fileAsyncTransport,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transportOptions: {
    FS: RNFS,
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

export async function getLogs() {
  const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
  const logs = files
    .filter(item => item.name.startsWith('log_'))
    .sort((a, b) => b.name.localeCompare(a.name));
  return logs;
}

export async function getConcatenatedLog() {
  let res = '';
  const logs = await getLogs();

  for await (const file of logs) {
    const content = await RNFS.readFile(file.path);
    res += `\n${'-'.repeat(50)}\n`;
    res += file.name;
    res += '\n';
    // reverse so we have one chronologically sorted log stream
    res += content.split('\n').reverse().join('\n');
  }
  return res;
}

export async function deleteOldLogs() {
  Logger.debug('Cleaning up logs');
  const logs = await getLogs();
  const logsToDelete = logs.slice(5);
  Logger.debug(`found ${logsToDelete.length} logs to delete`);

  for await (const file of logsToDelete) {
    Logger.debug(`deleting ${file.name}`);
    await RNFS.unlink(file.path);
  }
}
