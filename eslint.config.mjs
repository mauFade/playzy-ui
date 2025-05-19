import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:sonarjs/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ),
  {
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "Interface$",
            match: true,
          },
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],

      // Import rules
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
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",

      // Code quality rules
      "no-unused-vars": "off", // Using TypeScript's noUnusedLocals instead
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      eqeqeq: ["error", "always"],
      "max-lines-per-function": ["warn", { max: 50 }],
      "max-params": ["warn", { max: 3 }],
      "max-nested-callbacks": ["error", { max: 3 }],
      complexity: ["error", { max: 10 }],

      // React specific rules
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-children-prop": "error",
      "react/no-danger": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unknown-property": "error",
      "react/require-render-return": "error",
      "react/self-closing-comp": "error",

      // SonarJS rules
      "sonarjs/no-duplicate-string": "error",
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-redundant-boolean": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/prefer-object-literal": "error",
      "sonarjs/prefer-single-boolean-return": "error",
    },
  },
];

export default eslintConfig;
