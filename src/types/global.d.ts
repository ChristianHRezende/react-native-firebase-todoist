import {PropsWithChildren} from 'react';

declare global {
  declare module '*.png';
  declare module '*.jpeg';
  declare module '*.jpg';

  interface BaseComponentPropsWithChildren extends PropsWithChildren {
    className?: string;
  }

  declare namespace TailwindConfig {
    interface Colors extends Omit<AppTheme.Colors, 'base' | 'background'> {
      dark: {
        base: string;
        background: string;
      };
      light: {
        base: string;
        background: string;
      };
    }
  }

  declare namespace AppTheme {
    type AppColorsType =
      | 'primary'
      | 'secondary'
      | 'base'
      | 'background'
      | 'success'
      | 'warning'
      | 'error';

    type ColorScheme = 'light' | 'dark';
    type Colors = Record<AppColorsType, string>;

    interface ThemeProps {
      mode: ColorScheme;
      colors: Colors;
    }
  }
}
