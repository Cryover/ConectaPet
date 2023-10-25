import React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {AnimatedFAB} from 'react-native-paper';
import {StyleProp} from 'react-native';

interface CustomFabButtonProps {
  visible: boolean;
  isExtended: boolean;
  style: StyleProp<TextStyle | ViewStyle>;
  onPress: () => void;
}

const CustomFabButton: React.FC<CustomFabButtonProps> = ({
  visible,
  isExtended,
  style,
  onPress,
}) => {
  //const fabStyle = {[animateFrom]: 16};

  return (
    <AnimatedFAB
      icon={'plus'}
      label={'Label'}
      extended={isExtended}
      onPress={onPress}
      visible={visible}
      animateFrom={'right'}
      iconMode={'static'}
      style={[styles.fabStyle, style]}
    />
  );
};

export default CustomFabButton;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
