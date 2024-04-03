const colorSchema: Record<AppTheme.AppColors, string> = {
  primary: 'text-primary dark:text-primary',
  secondary: 'text-secondary dark:text-secondary',
  base: 'text-base dark:text-background',
  background: 'text-background dark:text-background',
  success: 'text-success dark:text-success',
  warning: 'text-warning dark:text-warning',
  error: 'text-error dark:text-error',
};

export function getTextColor(colorName: AppTheme.AppColors) {
  return colorSchema[colorName];
}
