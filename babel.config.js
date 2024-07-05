module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-platform-specific-extensions', { extensions: ['css'] }],
      '@babel/plugin-proposal-export-namespace-from',
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
