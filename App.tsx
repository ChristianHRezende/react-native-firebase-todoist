/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {SignIn} from './src/features/SignIn';

function App(): React.JSX.Element {
  return (
    <SafeAreaView className={`text-background dark:text-background`}>
      <StatusBar
        barStyle={'dark-content'}
        // className={`text-background dark:text-background`}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className={`text-background dark:text-background`}>
        <SignIn />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
