import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { hot } from 'react-hot-loader/root';
import reportWebVitals from 'reportWebVitals';

import App from 'core/App';

import 'services/wdyr';

const root = ReactDOM.createRoot(document.getElementById('root'));
const HotApp = hot(App);
root.render(
  <React.StrictMode>
    <HotApp />
  </React.StrictMode>
);

reportWebVitals();
