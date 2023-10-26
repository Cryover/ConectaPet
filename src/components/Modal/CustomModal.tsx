import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Portal, Modal} from 'react-native-paper';

interface CustomModalProps {
  visible: boolean;
  //hideModal: boolean;
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
        {children}
      </Modal>
    </Portal>
  );
};

export default CustomModal;
