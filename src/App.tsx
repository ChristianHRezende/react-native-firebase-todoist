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
import {
  SignInScreen,
  SignUpScreen,
  TaskDetailsScreen,
  TaskFormScreen,
  WelcomeScreen,
} from './features';

const Stack = createNativeStackNavigator<RootStackParamsList>();

function App(): React.JSX.Element {
  const {mode, colors} = useThemeContext();
  const {t} = useTranslation();
  const {user, initializing} = useInitFirebase();
  const navigatorScreenOptions = {
    headerStyle: {backgroundColor: colors.background},
    headerTitleStyle: {
      color: colors.base,
    },
    headerShown: false,
  };

  if (initializing) {
    return <Container screen initializing={initializing} />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Welcome'}
        screenOptions={navigatorScreenOptions}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitle: t('get.started'),
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerTitle: t('sign.in'),
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TaskForm" component={TaskFormScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
