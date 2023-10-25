import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {ControlTextInput} from '../atoms/controller/ControlTextInput';

export function CadastroDepesasModal(props: any) {
  const {control, handleSubmit} = useForm({mode: 'onChange'});
  const [visible, setVisible] = React.useState(props.visible);

  /* React.useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]); */

  const onRegisterPressed = (data: any) => {
    // Validate User
    console.log(data);
  };

  const onCancelPressed = (data: any) => {
    // Validate User
    setVisible(false);
    console.log(data);
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={props.visible}
          onDismiss={props.hideModal}
          contentContainerStyle={styles.modal}>
          <View>
            <Text>Cadastro de Despesas</Text>
            <ControlTextInput
              control={control}
              name="usuario"
              rules={{
                required: 'Senha Obrigatória',
                minLength: {
                  value: 6,
                  message: 'Mínimo de 6 caracteres',
                },
              }}
              style={styles.input}
              label="Nome de Usuário"
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit(onRegisterPressed)}>
              Registrar
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={onCancelPressed}>
              Cancelar
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  input: {
    //height: 40,
    width: 300,
  },
  button: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  links: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'center',
  },
});
