module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": 0,
        "react/display-name": "off",
        "typeof": 0,
        "no-unused-vars": "off",
        "no-undef": 0,
        "react/no-children-prop": "off"
    }
};
