import React from 'react';
import ReactNative from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import Main from './Main';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const wrapper = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default wrapper;
