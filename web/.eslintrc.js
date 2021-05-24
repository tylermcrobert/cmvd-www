// from: //andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    // 'prettier/prettier',
    // 'prettier/react',
    // 'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'no-underscore-dangle': ['off'],
    'no-unused-vars': ['warn'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'arrow-body-style': 0,
    semi: 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
