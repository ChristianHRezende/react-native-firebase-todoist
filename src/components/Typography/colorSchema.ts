import {TypographyVariant} from './types';

const colorSchema: Record<AppTheme.AppColors, string> = {
  primary: 'text-primary dark:text-primary',
  secondary: 'text-secondary dark:text-secondary',
  base: 'text-light-base dark:text-dark-base',
  background: 'text-light-background dark:text-dark-background',
  success: 'text-success dark:text-success',
  warning: 'text-warning dark:text-warning',
  error: 'text-error dark:text-error',
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

export function getTextColor(colorName: AppTheme.AppColors) {
  return colorSchema[colorName];
}

export function getTextVariant(variant: TypographyVariant) {
  return variantSchema[variant];
}
