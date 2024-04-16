import {Typography} from 'components';
import React from 'react';
import {PropsWithChildren} from 'react';
import {View} from 'react-native';

interface FormContainerProps extends PropsWithChildren {
  title: string;
}
export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
}) => (
  <View className="space-y-2 my-1">
    <Typography variant="sm">{title}</Typography>
    <View className="border border-blue-900 rounded-lg px-3 py-2 my-1">
      {children}
    </View>
  </View>
);
