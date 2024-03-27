import React, {createContext, ReactNode, useContext, useEffect} from 'react';
import {useColorScheme} from 'nativewind';
import {useColorScheme as useRNColorScheme} from 'react-native';

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<AppTheme.ThemeProps>(
  {} as AppTheme.ThemeProps,
);

export default function ThemeProvider({children}: ThemeContextProviderProps) {
  const rnColorSchema = useRNColorScheme() ?? 'dark';
  const {colorScheme, setColorScheme} = useColorScheme();

  useEffect(() => {
    if (rnColorSchema) {
      setColorScheme(rnColorSchema);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rnColorSchema]);

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
