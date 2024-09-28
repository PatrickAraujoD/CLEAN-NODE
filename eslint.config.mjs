import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/no-explicit-any": "always",
      "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "quotes": ["error"],
      "comma-dangle": ["error", "always-multiline"],
      "space-before-function-paren": ["error", "always"],
    },
  },
  {languageOptions: { globals: globals.node}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];