import 'services/wdyr';

import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'core/App';
import reportWebVitals from 'reportWebVitals';

import 'normalize.css';
import 'assets/scss/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
const HotApp = hot(App);
root.render(
  <React.StrictMode>
    <HotApp />
  </React.StrictMode>
);

reportWebVitals();
