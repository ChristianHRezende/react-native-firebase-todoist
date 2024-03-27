/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AppCombineProvider} from './src/contexts';

const Main = () => (
  <AppCombineProvider>
    <App />
  </AppCombineProvider>
);

AppRegistry.registerComponent(appName, () => Main);
