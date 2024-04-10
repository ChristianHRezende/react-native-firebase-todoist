import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AppCombineProvider} from './src/contexts';
import 'utils/language/i18nextConfig';

const Main = () => (
  <AppCombineProvider>
    <App />
  </AppCombineProvider>
);

AppRegistry.registerComponent(appName, () => Main);
