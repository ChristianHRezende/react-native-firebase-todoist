import {TypographyVariant} from '../../components/Typography/types';

const colorSchema: Record<AppTheme.AppColorsType, string> = {
  primary: 'text-primary dark:text-primary',
  secondary: 'text-secondary dark:text-secondary',
  base: 'text-light-base dark:text-dark-base',
  background: 'text-light-background dark:text-dark-background',
  success: 'text-success dark:text-success',
  warning: 'text-warning dark:text-warning',
  error: 'text-error dark:text-error',
  gray: 'text-light-gray dark:text-dark-gray',
};

const variantSchema: Record<TypographyVariant, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  ['2xl']: 'text-2xl',
  ['3xl']: 'text-3xl',
  ['4xl']: 'text-4xl',
  ['5xl']: 'text-5xl',
  ['6xl']: 'text-6xl',
};

export function getTextColor(colorName: AppTheme.AppColorsType) {
  return colorSchema[colorName];
}

export function getTextVariant(variant: TypographyVariant) {
  return variantSchema[variant];
}
