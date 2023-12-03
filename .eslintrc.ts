/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "prettier",
    "@typescript-eslint/eslint-plugin",
    "unused-imports",
    "import",
  ],
  extends: [
    "prettier",
    "airbnb",
    "airbnb-typescript",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    "tailwindcss/no-custom-classname": "off",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "default-case": "off",
    "consistent-return": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
      },
    ],
    "react/require-default-props": "off",
    "import/prefer-default-export": "off",
    "prettier/prettier": ["error"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow", // How to disallow for used vars, not priority
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "enumMember",
        format: ["PascalCase"],
      },
      {
        selector: "variable",
        modifiers: ["destructured", "unused"],
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelAttributes: ["label"],
        depth: 3,
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["./*.config.*"] },
    ],
  },
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
      config: "tailwind.config.js",
    },
    "import/core-modules": ["electron"],
    "import/resolver": {
      typescript: {},
    },
  },
};
