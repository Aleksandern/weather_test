module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 0,
    "import/no-unresolved": "off",
    "class-methods-use-this": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/static-property-placement": ["warn", "property assignment", {
      defaultProps: "static public field",
    }],
    "max-len": ["error", { "code": 170 }],
  },
};
