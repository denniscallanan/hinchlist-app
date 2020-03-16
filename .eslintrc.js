module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "node": true, 
      "jest": true,
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 9,
      "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
      "prettier",
      "react"
    ],
    "rules": {
      "prettier/prettier": "error"
    }
  };