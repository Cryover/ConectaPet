/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {RegistroScreenNavigationProp, User} from '../../types/types';
import {useForm} from 'react-hook-form';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import axiosInstance from '../../utils/axiosIstance';

export const RegistroScreen: React.FC<{
  navigation: RegistroScreenNavigationProp;
}> = ({navigation}) => {
  const {control, handleSubmit} = useForm();
  const [error, setError] = useState('');

  const onRegisterPressed = async (dataFields: any) => {
    try {
      console.log(dataFields);
      await axiosInstance
        .post('/login/registrar', dataFields)
        .then(response => {
          const newUser: User = response.data;
          console.log('newUser', newUser);
          console.info('Conta criada! Faça Login para poder acessar o app');
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
          setError('Erro ao cadastrar nova conta.');
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.webp')}
      />
      <ControlTextInput
        name={'username'}
        label={'Username'}
        mode={'flat'}
        control={control}
        rules={{
          required: 'Nome de Pet Obrigatório',
        }}
        style={styles.input}
        secureTextEntry={false}
      />

      <ControlTextInput
        name={'password'}
        label={'Senha'}
        mode={'flat'}
        control={control}
        rules={{required: 'Senha de pet Obrigatório'}}
        style={styles.input}
        secureTextEntry={false}
      />
      <ControlTextInput
        name={'email'}
        label={'Email'}
        mode={'flat'}
        control={control}
        rules={{required: 'Raça de pet Obrigatório'}}
        style={styles.input}
        secureTextEntry={false}
      />
      <ControlTextInput
        name={'nome'}
        label={'Nome'}
        mode={'flat'}
        control={control}
        rules={{required: 'Raça de pet Obrigatório'}}
        style={styles.input}
        secureTextEntry={false}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onRegisterPressed)}>
        Registrar
      </Button>
    </SafeAreaView>
  );
};

export default RegistroScreen;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  input: {
    marginBottom: 10,
    width: 300,
  },
  button: {
    marginTop: 10,
    color: '#5D6BB0',
  },
  links: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
  },
});
