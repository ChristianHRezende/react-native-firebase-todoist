import {PropsWithChildren} from 'react';

declare global {
  declare module '*.png';
  declare module '*.jpeg';
  declare module '*.jpg';

  interface BaseComponentPropsWithChildren extends PropsWithChildren {
    className?: string;
  }

  type Timestamp = {
    nanoseconds: number;
    toDate: () => Date;
  };

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
      | 'error'
      | 'gray';

    type ColorScheme = 'light' | 'dark';
    type Colors = Record<AppColorsType, string>;

    interface ThemeProps {
      mode: ColorScheme;
      colors: Colors;
    }
  }
}
