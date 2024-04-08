import {combineComponents} from './utils/combineProviders';
import ThemeProvider from './ThemeContext';
import {ToastProvider} from 'react-native-toast-notifications';
import {CombineProvider} from './utils/types/types';
import {QueryClientProvider} from './providers';

const providers = [
  ThemeProvider,
  ToastProvider as CombineProvider,
  QueryClientProvider as CombineProvider,
];

export const AppCombineProvider = combineComponents(...providers);
