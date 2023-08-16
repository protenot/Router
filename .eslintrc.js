module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest/globals": true,
    },
    "extends": [
        "prettier",
        //"standard-with-typescript",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"

],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: ["jest", "import"],
    "rules": {
        "no-undef":"off",
        "@typescript-eslint/no-var-requires":"off",
        "import/prefer-default-export": "off",
        "import/no-unresolved": "off",
        "import/extensions": ["warn", "never"],
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
    }
}
