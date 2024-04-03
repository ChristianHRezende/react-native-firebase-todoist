import {PropsWithChildren} from 'react';

declare global {
  declare module '*.png';
  declare module '*.jpeg';
  declare module '*.jpg';

  interface BaseComponentPropsWithChildren extends PropsWithChildren {
    className?: string;
  }

  declare namespace AppTheme {
    type AppColors =
      | 'primary'
      | 'secondary'
      | 'base'
      | 'background'
      | 'success'
      | 'warning'
      | 'error';

    interface ThemeProps {
      mode: 'light' | 'dark';
    }
  }
}
