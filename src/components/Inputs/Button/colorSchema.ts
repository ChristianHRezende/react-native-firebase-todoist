const colorSchema: Record<AppTheme.AppColors, string> = {
  primary: 'bg-primary dark:bg-primary',
  secondary: 'bg-secondary dark:bg-secondary',
  base: 'bg-light-base dark:bg-dark-background',
  background: 'bg-light-background dark:bg-dark-background',
  success: 'bg-success dark:bg-success',
  warning: 'bg-warning dark:bg-warning',
  error: 'bg-error dark:bg-error',
};

export function getButtonColor(colorName: AppTheme.AppColors) {
  return colorSchema[colorName];
}
