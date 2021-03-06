import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from "./redux/configureStore";
import { Provider } from 'react-redux';

const store = configureStore().store;
const persistor = configureStore().persistor;

const app = (
  <Provider store={store}>
  	<PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));