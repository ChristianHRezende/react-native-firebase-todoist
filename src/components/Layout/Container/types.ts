import {PropsWithChildren} from 'react';
import {ScrollViewProps} from 'react-native';
import {SafeAreaProviderProps} from 'react-native-safe-area-context';

export interface ContainerProps extends PropsWithChildren {
  safeAreViewProps?: SafeAreaProviderProps;
  scrollViewProps?: ScrollViewProps;
  screen?: boolean;
  viewClassname?: string;
}
