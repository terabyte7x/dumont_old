module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:security/recommended'],
  plugins: ['prettier', 'security'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier" :  ["error", {
      "endOfLine":"auto"
    }],
    "class-method-use-this" : "off",
    "no-param-reassing" : "off", //Precisa estar desabilitado por causa do sequilize
    "camelcase" : "off",
    "no-unused-vars": ["error", { "argsIgnorePaterns" : "next" }]
  },
};
