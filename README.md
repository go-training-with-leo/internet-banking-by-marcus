# INTERNET - BANKING
INTERNET - BANKING

## Deployment
**Note:** [Live demo](https://eightbank.netlify.app/)

## Prerequisite

### yarn

```bash
npm install -g yarn
```

### Installation

```bash
yarn
```

### Environment variables
**Note:** Please ask another dev to get access to the env vars in these files.

.env
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

### Run environment

```bash
yarn start
```

### Jest Test

To run test

```
yarn test (-u: to update snapshot, -a: to run all tests file) <file>
```

Test file must be on /src/__tests__
Test file must have extension .test.js(x)
Mock module on __tests__/__mocks__/

Cheers 🍺🍺
Happy coding!