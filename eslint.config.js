/**
 * @file ESLint configuration file for React TypeScript projects.
 * @see https://eslint.org/docs/latest/user-guide/configuring
 */
 module.exports = [
  {
  // Ignore certain file types from ESLint checks.
  ignores: ['node_modules/**/*', '.next/**/*'],
  },
  {
  // Define the base configuration for all JavaScript and TypeScript files.
  files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  languageOptions: {
  // Specify the JavaScript version.
  ecmaVersion: 'latest',
  // Set the source type to module (for ES modules).
  sourceType: 'module',
  parserOptions: {
  // Enable JSX support.
  ecmaFeatures: {
  jsx: true,
  },
  },
  },
  linterOptions: {
  // Enable reporting of unused `eslint-disable` comments.
  reportUnusedDisableDirectives: true,
  },
  },
  {
  // Define the JavaScript-specific configuration.
  files: ['*.js', '*.jsx'],
  rules: {
  // Enforce indentation of 2 spaces.
  indent: ['warn', 2],
  // Enforce single quotes for string literals.
  quotes: ['warn', 'single'],
  // Enforce semicolons at the end of statements.
  semi: ['warn', 'always'],
  // Warn about unused variables.
  'no-unused-vars': 'warn',
  // Prevent console.log statements in production code.
  'no-console': 'warn',
  },
  },
  {
  // Define the TypeScript-specific configuration.
  files: ['*.ts', '*.tsx'],
  // Use the TypeScript ESLint parser.
  parser: '@typescript-eslint/parser',
  parserOptions: {
  // Specify the project's tsconfig.json file.
  project: ['./tsconfig.json'],
  // Enable JSX support.
  ecmaFeatures: {
  jsx: true,
  },
  },
  settings: {
  react: {
  version: 'detect',
  },
  },
  plugins: [
  // Add TypeScript ESLint plugin.
  '@typescript-eslint',
  'react',
  'react-hooks',
  ],
  extends: [
  // Extend the recommended ESLint rules.
  'eslint:recommended',
  // Extend the recommended TypeScript ESLint rules.
  'plugin:@typescript-eslint/recommended',
  // Extend the recommended React rules.
  'plugin:react/recommended',
  // Extend the recommended React Hooks rules.
  'plugin:react-hooks/recommended',
  ],
  rules: {
  // Enforce indentation of 2 spaces.
  indent: ['warn', 2],
  // Enforce single quotes for string literals.
  quotes: ['warn', 'single'],
  // Enforce semicolons at the end of statements.
  semi: ['warn', 'always'],
  // Warn about unused variables.
  'no-unused-vars': 'warn',
  // Prevent console.log statements in production code.
  'no-console': 'warn',
  // Disable prop-types rule (not needed in TypeScript).
  'react/prop-types': 'off',
  // Disable explicit function return type requirement.
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-explicit-any': 'warn',
  // Adjust the severity of the no-unused-vars rule for TypeScript files.
  '@typescript-eslint/no-unused-vars': 'warn',
  // Allow the use of the ! operator to assert that an expression is non-null or non-undefined
  '@typescript-eslint/no-non-null-assertion': 'off',
  // Disable the no-use-before-define rule to prevent issues with React components
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': ['error'],
  'react/react-in-jsx-scope': 'off',
  // Custom rules can be added here
  },
  env: {
  // Define the environment as browser and ES2024.
  browser: true,
  es2024: true,
  },
  },
 ];