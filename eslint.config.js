import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: { prettier },
    rules: { 'prettier/prettier': 'error' }
  }
];
