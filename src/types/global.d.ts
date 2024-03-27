declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';

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
