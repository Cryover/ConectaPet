import React from 'react';
import {Image, SafeAreaView, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import {RecuperacaoContaScreenNavigationProp} from '../../types/types';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import {useForm} from 'react-hook-form';

export const RecuperacaoContaScreen: React.FC<{
  navigation: RecuperacaoContaScreenNavigationProp;
}> = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const onRegisterPressed = (data: any) => {
    // Validate User
    console.log(data);
    //console.log(watchSenha);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.webp')}
      />
      <ControlTextInput
        control={control}
        name="usuario"
        rules={{
          required: 'Email Obrigatório',
        }}
        style={styles.input}
        label="Email Cadastrado"
        secureTextEntry={false}
      />

      {/* <ControlTextInput
        control={control}
        name="confirmarSenha"
        rules={{
          validade: (value: string, formValues: any) =>
            value === watchSenha || 'As senhas não conferem',
        }}
        style={styles.input}
        secureTextEntry={true}
        label="Confirmar Senha"
      /> */}

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onRegisterPressed)}>
        Enviar
      </Button>
    </SafeAreaView>
  );
};

export default RecuperacaoContaScreen;

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
    marginBottom: 20,
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
});
