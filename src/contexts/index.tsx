import {combineComponents} from './utils/combineProviders';
import ThemeProvider from './ThemeContext';

const providers = [ThemeProvider];
export const AppCombineProvider = combineComponents(...providers);
