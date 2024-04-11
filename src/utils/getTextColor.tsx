const colorSchema: Record<AppTheme.AppColorsType, string> = {
  primary: 'text-primary dark:text-primary',
  secondary: 'text-secondary dark:text-secondary',
  base: 'text-base dark:text-background',
  background: 'text-background dark:text-background',
  success: 'text-success dark:text-success',
  warning: 'text-warning dark:text-warning',
  error: 'text-error dark:text-error',
  gray: 'text-light-gray dark:text-dark-gray',
};

export function getTextColor(colorName: AppTheme.AppColorsType) {
  return colorSchema[colorName];
}
