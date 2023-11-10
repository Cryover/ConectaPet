import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {AnimatedFAB, AnimatedFABAnimateFrom} from 'react-native-paper';
import {StyleProp} from 'react-native';

interface CustomFabButtonProps {
  label: string;
  visible: boolean;
  isExtended: boolean;
  animateFrom: AnimatedFABAnimateFrom;
  style: StyleProp<TextStyle | ViewStyle>;
  onPress: () => void;
}

const CustomFabButton: React.FC<CustomFabButtonProps> = ({
  label,
  visible,
  isExtended,
  style,
  animateFrom,
  onPress,
}) => {
  const fabStyle = {[animateFrom]: 16};

  return (
    <AnimatedFAB
      icon={'plus'}
      label={label}
      color={'black'}
      extended={!isExtended}
      onPress={onPress}
      visible={visible}
      animateFrom={animateFrom}
      iconMode={'static'}
      style={[style, fabStyle]}
    />
  );
};

export default CustomFabButton;
