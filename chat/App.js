/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import {Provider} from 'react-redux'
import store from './src/store/index.js'
import LandingPage from './src/containers/LandingPage'

const App: () => React$Node = () => {

  return (
    <Provider store={store}>
      <LandingPage/>
    </Provider>
  );
};

export default App;
