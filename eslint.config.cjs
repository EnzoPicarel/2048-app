module.exports = [
  {
    ignores: ["node_modules/**", ".nuxt/**", ".output/**"]
  },
  {
    files: ["**/*.{ts,vue,js}"],
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        parser: require("@typescript-eslint/parser"),
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    // configuration minimale en format "flat" (ESLint v9)
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  }
]
