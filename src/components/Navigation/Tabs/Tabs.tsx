import {Typography} from 'components/Typography';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

type TabContent = {
  title: string;
  selected: boolean;
  onPress: () => void;
};
interface TabsProps {
  data: TabContent[];
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({data, className}) => {
  if (!data) {
    return (
      <View className={'justify-between items-center my-0.5 mb-2'}>
        <Typography> NO Data</Typography>
      </View>
    );
  }
  return (
    <View
      className={`flex-row justify-evenly items-center my-2 mb-4 ${className}`}>
      {data.map(({title, selected, onPress}) => (
        <View
          key={'tabs-item-' + title.split(' ').join('-')}
          accessibilityLabel={`tab ${title}`}>
          <TouchableOpacity onPress={onPress}>
            <Typography customClassName={`${selected ? 'underline ' : ''}`}>
              {title}
            </Typography>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
