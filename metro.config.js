const {getDefaultConfig} = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = (() => {
  const config = getDefaultConfig(__dirname, {
    // Enable CSS support from SDK version 49 and up
    isCSSEnabled: true,
  });
  const {transformer, resolver} = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };
  config.resolver.sourceExts.push('mjs'); // needed for canvas confetti

  return config;
})();
