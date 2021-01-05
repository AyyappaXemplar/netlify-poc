[![Netlify Status](https://api.netlify.com/api/v1/badges/df26efb0-13bf-4f3e-8fe7-67bf301247b8/deploy-status)](https://app.netlify.com/sites/sirius-react/deploys) [![Codeship Status for kohactive/sirius-react](https://app.codeship.com/projects/a14c3ff0-bf10-0138-b45c-666e43dcc9c3/status?branch=master)](https://app.codeship.com/projects/405804)

## Local Setup

- Copy the content of `.env.example` to a new file named `.env.development` and replace the variables as needed.

Install dependencies:

`yarn install`

- Run the local server:

`yarn start`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Sirius App

### Storing a quote Id in local storage

Your browser local storage adds a new key `siriusQuoteId` after a quote is created. If this key is populated, the application will first fetch the quote from the backend on every page refresh. This key might need to be cleared every time that the new quote screen needs to be displayed for development purposes.

### Mixpanel

Add mixpanel to your application by setting and environment variable `REACT_APP_ENABLE_MIXPANEL`

In order to trigger a call to Mixpanel, first import the mixpanel instance, then call the action needed on the instance:

``` javascript
import mixpanel from '../../config/mixpanel';

// call to mixpanel action
mixpanel.track('Created quote');

```

The call to mixpanel should be inserted in a lifecible method like `componentDidMount` or a effect hook:
```
useEffect(() => { mixpanel.track('myEvent') }, [])
```

You can inspect `src/config/mixpanel.js` and edit the available actions if needed.
