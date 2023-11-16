/* eslint-disable react/self-closing-comp */
import React, { useState} from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import {Button, Text } from 'react-native-paper';
import {useAuthContext} from '../../contexts/authContext';
import {LoginScreenNavigationProp, UserInfoResponse} from '../../types/types';
import { useLoading } from '../../contexts/loadingContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import axiosInstance from '../../utils/axiosIstance';

const LoginScreen: React.FC<{navigation: LoginScreenNavigationProp}> = ({
  navigation,
}) => {
  const [error, setError] = useState('');
  const {logIn} = useAuthContext();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { control, handleSubmit } = useForm();

  const onLoginPressed = async (dataFields: any) => {
    try {
      startLoading();
      console.log(dataFields);
      const response = await axiosInstance.post('/login', dataFields);
      //console.log('response', response.statusText);
      const newResponde: UserInfoResponse = response.data;

      const teste = await logIn(dataFields);
      console.log(teste);
      if (teste) {
        await AsyncStorage.setItem('userToken', newResponde.userToken);
        await AsyncStorage.setItem('userInfo', JSON.stringify(newResponde.usuario));
        stopLoading();
        navigation.navigate('Home');
      } else {
        stopLoading();
        setError('Nome do usuário ou senha incorreto.\n Tente novamente.');
      }

      //console.log('Passou');
    } catch (err) {
      stopLoading();
      console.log(err);
      setError('ERRO 500 - Erro interno no servidor.');
    }
  };

  return (
    <SafeAreaView
      style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.webp')}
      />

      <ControlTextInput
        control={control}
        name="username"
        rules={{
          required: 'Nome de Usuario Obrigatório',
        }}
        style={styles.input}
        label="Nome de Usuário ou Email"
        secureTextEntry={false}
      />

      <ControlTextInput
        control={control}
        name="password"
        rules={{
          required: 'Senha Obrigatória',
          minLength: {
            value: 6,
            message: 'Mínimo de seis caracteres',
          },
        }}
        style={styles.input}
        secureTextEntry={true}
        label="Senha"
      />
      {isLoading ? <LoadingOverlay /> : <Text children={undefined}></Text>}
      <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>

      <Text
        style={styles.links}
        onPress={() => navigation.navigate('RecuperacaoConta')}>
        Esqueceu a senha?
      </Text>
      <Text
        style={styles.links}
        onPress={() => navigation.navigate('Registro')}>
        Não possui conta? clique aqui!
      </Text>

      <Button
        icon="login"
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onLoginPressed)}>
        Log In
      </Button>

    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create<any>({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  input: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    marginTop:10,
    color: '#5D6BB0',
  },
  links: {
    color: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
  helperText: {

  },
});
