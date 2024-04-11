import {FloatButton} from 'components';
import React from 'react';
import {View} from 'react-native';

type HomeBottomMenuProps = {
  onAddTaskPress: () => void;
};

export const HomeBottomMenu: React.FC<HomeBottomMenuProps> = ({
  onAddTaskPress,
}) => {
  return (
    <View>
      <FloatButton action="Add" onPress={onAddTaskPress} />
    </View>
  );
};
