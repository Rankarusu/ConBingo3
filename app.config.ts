import { ExpoConfig } from 'expo/config';

const withSigningConfig = require('./signing-config-plugin');

const config: ExpoConfig = {
  name: 'Convention Bingo',
  slug: 'ConventionBingo',
  scheme: 'conbingo',
  version: '4.1.0',
  orientation: 'portrait',
  icon: './assets/logo_full.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFF',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.conbingo',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/logo_fg.png',
      backgroundImage: './assets/logo_bg.png',
    },
    package: 'com.conbingo',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.conbingo',
    versionCode: 24,
  },
  web: {
    favicon: './assets/favicon_dark.png',
    bundler: 'metro',
    output: 'single',
  },
  plugins: ['expo-router', './signing-config-plugin'],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  extra: {
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.conbingo', // the android config is not readable in web
    githubUrl: 'https://github.com/Rankarusu/ConBingo3',
    githubIssuesUrl: 'https://github.com/Rankarusu/ConBingo3/issues/new/choose',
    webUrl: 'https://con.bingo',
    router: {
      origin: false,
    },
  },
};

export default withSigningConfig(config);
