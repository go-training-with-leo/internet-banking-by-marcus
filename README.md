# INTERNET - BANKING
INTERNET - BANKING

## Prerequisite

### yarn

```bash
npm install -g yarn
```
**Note: -g is global install. If yarn is installed, skip this step**

### Installation

```bash
yarn
```

### Environment variables
**Create .env file:**
```
nano .env
```
**.env**
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
REACT_BASEURL=
REACT_APP_DNS=
REACT_APP_CYPRESS=
```
**Note:** Please ask another dev to get access to the env vars in these files.

### Run environment

```bash
yarn start
```

### Storybook
**To run storybook**

```
yarn storybook
```
Storybook file must be in /`src`/`components`/`<component>`/`*.stories.js`

Storybook is a tool for UI development. It makes development faster and easier by isolating components.
Check the [document](https://storybook.js.org/docs/react/get-started/introduction) to get you started!

### Jest Test

**To run test for file**
```
yarn test <file>
```
**To run test coverage all file**
```
yarn test -- --coverage
```
**To run test coverage only components folder**
```
yarn test -u -- --coverage --watchAll=false --collectCoverageFrom="./src/components/**/*.js"
```

Test file must be in /src/`__tests__`

Test file must have extension .test.js(x)

Check the [Jest document](https://jestjs.io/docs/getting-started) to get you started!

### Cypress (End to end testing)
**To run cypress**
```
yarn run cypress open
```
Then you can see **'end to end test'**, click it to run end to end test

Test file must be in /cypress/e2e/

Create file with *.spect.cy.js in /cypress/e2e/ to create a new end to end test.
 
Check the [Jest document](https://docs.cypress.io/guides/getting-started/installing-cypress) to get you started!

## Deployment
**Deployed on Netlify:**
Contact your team to join Netlify team. Then go to `Site setting/Build & deploy` to config stating and production deploy

**Staging:** Auto deploy & generate a different domain to test after PR

**Production:** [Production](https://eightbank.netlify.app/)

Cheers 🍺🍺
Happy coding!