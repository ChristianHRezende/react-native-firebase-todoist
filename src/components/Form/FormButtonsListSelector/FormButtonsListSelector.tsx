import {CircularProgress} from 'components/Feedback';
import {Button} from 'components/Inputs';
import React from 'react';
import {View} from 'react-native';

type ButtonListSelectorItem = {
  title: string;
  color: React.ComponentProps<typeof Button>['color'];
  onPress: () => void;
  disabled?: boolean;
};

interface FormButtonsListSelectorProps {
  loading?: boolean;
  data: Array<ButtonListSelectorItem>;
  containerClassName?: string;
}

export const FormButtonsListSelector = (
  props: FormButtonsListSelectorProps,
) => {
  const {loading, data, containerClassName} = props;

  function renderButtons() {
    return data.map(buttonProps => (
      <Button
        key={'button-option-selector-' + buttonProps.title}
        accessibilityLabel={buttonProps.title}
        size="small"
        variant="contained"
        {...buttonProps}
      />
    ));
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <View
      className={`flex-row justify-between items-center ${containerClassName}`}>
      {renderButtons()}
    </View>
  );
};
