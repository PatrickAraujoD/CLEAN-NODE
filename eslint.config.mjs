import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "@typescript-eslint/array-type": "error",
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "quotes": ["error"],
      "comma-dangle": ["error", "always-multiline"],
      "no-unused-vars": ["error", { "args": "none" }],
      "space-before-function-paren": ["error", "always"],
    },
  },
  {languageOptions: { globals: globals.node}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];