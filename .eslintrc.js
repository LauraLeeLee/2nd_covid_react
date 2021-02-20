{
    "extends": ["airbnb", "prettier", "prettier/react"],
    "rules": {
      "env": {
        "node": true,
        "es6": true
      },
      "experimentalDecorators": true,
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": "off",
      "global-require": "off",
      "consistent-return": "off",
      "react/destructuring-assignment": "off",
      "react/prop-types": 1,
      "no-use-before-define": [
        "error",
        { "functions": true, "classes": true, "variables": false }
      ],
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [".js", ".jsx"]
        }
      ],
      "prettier/prettier": [
        "error",
        {
          "printWidth": 100
        }
      ]
    },
    "plugins": ["prettier"],
    "parser": "babel-eslint"
  }