const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tsParser = require('@typescript-eslint/parser');

module.exports = defineConfig([
  globalIgnores(['dist/*']),

  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules'],
    languageOptions: {
      parser: tsParser,
    },
  },

  expoConfig,
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/internal-regex': '^@/',
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],

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
  },
]);
