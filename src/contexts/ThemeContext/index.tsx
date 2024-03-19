import React, {createContext, ReactNode, useContext} from 'react';
import {useColorScheme} from 'react-native';

interface ThemeContextProps {
  mode: 'light' | 'dark';
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export default function ThemeProvider({children}: ThemeContextProviderProps) {
  const colorScheme = useColorScheme() ?? 'dark';

  return (
    <ThemeContext.Provider
      value={{
        mode: colorScheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('use ThemeProvider is required to use this context');
  }
  return context;
}
