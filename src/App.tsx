import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Container} from 'components';
import {useThemeContext} from 'contexts/ThemeContext';

import {HomeScreen} from 'features/home/views/HomeScreen/HomeScreen';
import useInitFirebase from 'hooks/useInitFirebase';
import {useTranslation} from 'react-i18next';
import {RootStackParamsList} from 'types/navigation';
import {SignInScreen, SignUpScreen, WelcomeScreen} from './features';

const Stack = createNativeStackNavigator<RootStackParamsList>();

function App(): React.JSX.Element {
  const {mode, colors} = useThemeContext();
  const {t} = useTranslation();
  const {user, initializing} = useInitFirebase();

  if (initializing) {
    return <Container screen initializing={initializing} />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Welcome'}>
        <Stack.Screen
          name="Welcome"
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
            headerTitle: t('get.started'),
            headerTitleStyle: {
              color: colors.base,
            },
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerStyle: {backgroundColor: colors.background},
            headerTitle: t('sign.in'),
            headerTitleStyle: {
              color: colors.base,
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {backgroundColor: colors.background},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
