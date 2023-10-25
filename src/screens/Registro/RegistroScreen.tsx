/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {ControlTextInput} from '../../components/atoms/controller/ControlTextInput';

export function RegistroScreen() {
  const {control, handleSubmit, watch} = useForm({mode: 'onChange'});
  const watchSenha = watch('senha');
  const EMAIL_REGEX: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigation: any = useNavigation();

  const onRegisterPressed = (data: any) => {
    // Validate User
    console.log(data);
    console.log(watchSenha);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/rwIARcq.webp')}
      />
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

      <ControlTextInput
        control={control}
        name="email"
        rules={{
          required: 'Email Obrigatório',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Email Invalido',
          },
        }}
        style={styles.input}
        //label="Email"
      />

      <ControlTextInput
        control={control}
        name="senha"
        rules={{
          required: 'Senha Obrigatória',
          minLength: {
            value: 8,
            message: 'Mínimo de oito caracteres',
          },
        }}
        style={styles.input}
        secureTextEntry={true}
        //label="Senha"
      />

      <ControlTextInput
        control={control}
        name="confirmarSenha"
        rules={{
          validade: (value: string, formValues: any) =>
            value === watchSenha || 'As senhas não conferem',
        }}
        style={styles.input}
        secureTextEntry={true}
        label="Confirmar Senha"
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onRegisterPressed)}>
        Registrar
      </Button>
    </View>
  );
}

export default RegistroScreen;

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
});
