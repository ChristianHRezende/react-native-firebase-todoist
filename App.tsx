/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from './src/features';
import {useThemeContext} from 'contexts/ThemeContext';
import i18nextConfig from 'utils/language/i18nextConfig';

const init = async () => {
  i18nextConfig.initalizeI18Next();
};

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const {mode} = useThemeContext();

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={mode === 'dark' ? '#1D1C1C' : '#FFFFFF'}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
