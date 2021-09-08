module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
  ],
  "parserOptions": {
    "ecmaVersion": "2018",
    "sourceType": "module",
  },
  "rules": {
    "strict": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-unused-expressions": "error",
    "curly": "error",
    "block-scoped-var": "error",
    "eqeqeq": "error",
    "no-fallthrough": "error",
    "default-case": "error",
    "yoda": ["error", "never"],
    "no-var": "error",
    "prefer-const": "error",
    "prefer-destructuring": "warn",
    "no-prototype-builtins": "off",
    "no-constant-condition": "off",
    "no-invalid-regexp": "off"
  },
};
