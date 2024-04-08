/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useThemeContext} from 'contexts/ThemeContext';
import {SignUpScreen} from 'features/signUp';
import {WelcomeScreen} from './src/features';

export type RootStackParamsList = {
  Home: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

function App(): React.JSX.Element {
  const {mode, colors} = useThemeContext();
  console.log(mode, colors.background);
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerStyle: {backgroundColor: colors.background},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
