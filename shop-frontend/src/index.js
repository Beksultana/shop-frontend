import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter} from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import store, {history} from "./store/configerStore";

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
