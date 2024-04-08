import {useColorScheme} from 'nativewind';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {useColorScheme as useRNColorScheme} from 'react-native';
import tailwindConfig from '../../../tailwind.config';

const configColors = tailwindConfig.theme?.extend
  ?.colors as unknown as TailwindConfig.Colors;

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

  const colors = useMemo(
    () =>
      Object.entries(configColors).reduce((accumulator, currentValue) => {
        if (typeof currentValue[1] === 'string') {
          return Object.assign(accumulator, {
            [currentValue[0]]: currentValue[1],
          });
        }
        if (currentValue[0] === colorScheme) {
          return Object.assign(accumulator, {
            ...currentValue[1],
          });
        }
        return accumulator;
      }, {} as AppTheme.Colors),
    [colorScheme],
  );

  return (
    <ThemeContext.Provider
      value={{
        mode: colorScheme,
        colors,
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
