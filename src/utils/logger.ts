import {consoleTransport, logger} from 'react-native-logs';

const config = {
  severity: __DEV__ ? 'debug' : 'error',
  transport: consoleTransport,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
};

type LogLevels = keyof typeof config.levels;

const Logger = logger.createLogger<LogLevels>(config);

export {Logger};
