import React from 'react';
import {StyleProp, TextStyle, ViewStyle, ScrollView} from 'react-native';
import {Portal, Modal} from 'react-native-paper';

interface CustomModalProps {
  visible: boolean;
  children: any;
  onDismiss: () => void;
  containerStyle: StyleProp<TextStyle | ViewStyle>;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  containerStyle,
  children,
  onDismiss,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <ScrollView>{children}</ScrollView>
      </Modal>
    </Portal>
  );
};

export default CustomModal;
