module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['import'],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
    'import/ignore': ['react-native-reanimated'],
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'builtin',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'import/no-named-as-default': 'off',
    radix: 'off',
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
      },
    ],
  },
};
