import {consoleTransport, fileAsyncTransport, logger} from 'react-native-logs';
import RNFS from 'react-native-fs';

const now = new Date();
const y = now.getFullYear();
const m = (now.getMonth() + 1).toString().padStart(2, '0');
const d = now.getDate().toString().padStart(2, '0');

const fileName = `log_${y}-${m}-${d}.txt`;

const config = {
  severity: __DEV__ ? 'debug' : 'error',
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
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

const Logger = logger.createLogger<LogLevels>(config);

async function deleteOldLogs() {
  Logger.debug('Cleaning up logs');
  const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
  const logs = files
    .filter(item => item.name.startsWith('log_'))
    .sort((a, b) => b.name.localeCompare(a.name));

  const logsToDelete = logs.slice(5);
  Logger.debug(`found ${logsToDelete.length} logs to delete`);

  for await (const file of logsToDelete) {
    Logger.debug(`deleting ${file.name}`);
    await RNFS.unlink(file.path);
  }
}

export {Logger, deleteOldLogs};
