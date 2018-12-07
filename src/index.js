import { injectGlobal } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import globalCSS from './themes/globalCSS';
import routeTransitions from './themes/routeTransitions';
import './themes/semantic/dist/semantic.min.css';

import App from './features/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  ${globalCSS}
  ${routeTransitions}
`;

// if (process.env.NODE_ENV !== 'production') {
//   const { registerObserver } = require('react-perf-devtool');

//   registerObserver();
// }

const createdStore = configureStore();
const { store, persistor } = createdStore;

const root = document && document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  root
);

registerServiceWorker();
