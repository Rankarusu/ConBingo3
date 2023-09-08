import {ExpoConfig} from 'expo/config';

const withSigningConfig = require('./signing-config-plugin');

const config: ExpoConfig = {
  name: 'Convention Bingo',
  slug: 'ConventionBingo',
  scheme: 'conbingo',
  version: '3.0.0',
  orientation: 'portrait',
  icon: './assets/logo_full.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/logo_fg.png',
    resizeMode: 'contain',
    backgroundColor: '#dc18d3',
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
    versionCode: 16,
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
    router: {
      origin: false,
    },
  },
};

export default withSigningConfig(config);
