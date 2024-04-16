const colorSchema: Record<AppTheme.AppColorsType, string> = {
  primary: 'bg-primary dark:bg-primary',
  secondary: 'bg-secondary dark:bg-secondary',
  base: 'bg-light-base dark:bg-dark-background',
  background: 'bg-light-background dark:bg-dark-background',
  success: 'bg-success dark:bg-success',
  warning: 'bg-warning dark:bg-warning',
  error: 'bg-error dark:bg-error',
  gray: 'bg-light-gray dark:bg-dark-gray',
};

export function getButtonColor(colorName: AppTheme.AppColorsType) {
  return colorSchema[colorName];
}
