/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {View, StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';

export enum AcaoSelect {
  'Inserção',
  'Alteração',
  'Exclusão',
}

interface CustomTextInputProps {
  visible: boolean;
  acaoSelect: AcaoSelect;
  onToggleSnackBar: () => void;
  onDismissSnackBar: () => void;
  style: StyleProp<TextStyle | ViewStyle>;
}

const CustomSnackBar: React.FC<CustomTextInputProps> = ({
  acaoSelect,
  visible,
  onToggleSnackBar,
  onDismissSnackBar,
  style,
}) => {
  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {acaoSelect} de Recurso com sucesso
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CustomSnackBar;
