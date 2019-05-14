module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "max-len": 0,
      "no-plusplus": 0,
      "class-methods-use-this": 0,
      "object-curly-newline": 0,
      "no-console": 0,
      "jsx-quotes": 0,
      "react/destructuring-assignment": 0
    }
};
