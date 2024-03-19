import {PropsWithChildren} from 'react';

export type TypographyVariant =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export interface TypographyProps extends PropsWithChildren {
  variant?: TypographyVariant;
  color?: AppTheme.AppColors;
  heading?: boolean;
  className?: string;
}

export interface StyledTypographyProps extends Omit<TypographyProps, 'color'> {}
