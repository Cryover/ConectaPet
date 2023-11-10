import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import ControlTextInput from '../../components/atoms/controller/ControlTextInput';
import { useAuthContext } from '../../contexts/authContext';
import axiosInstance from '../../utils/axiosIstance';
import { UserInfo, UserInfoResponse } from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoading } from '../../contexts/loadingContext';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import { formatAndStringify } from '../../pipes/formatJson';


const LoginScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { control, handleSubmit } = useForm();
  /* const EMAIL_REGEX: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; */
  const [error, setError] = useState('');
  const { logIn } = useAuthContext();
  const { startLoading, stopLoading, isLoading } = useLoading();

  const onLoginPressed = async (dataFields: any) => {
    try {
      startLoading();
      const response = await axiosInstance.post('/login', dataFields);
      console.log('response', response.data);
      const newResponde: UserInfoResponse = response.data;

      const teste = await logIn(response);
      if (teste) {
        await AsyncStorage.setItem('userToken', newResponde.userToken);
        await AsyncStorage.setItem('userInfo', JSON.stringify(newResponde.usuario));
        const userInfo = await AsyncStorage.getItem('userInfo');
        const userInfoObj:UserInfo = formatAndStringify(userInfo);
        console.log('saveInfo', userInfoObj);
        console.log('saveInfoOBJ', userInfoObj.nome);
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
      setError('Nome do usuário ou senha incorreto.\n Tente novamente.');
    }
  };

  return (
    <View style={styles.centerView}>
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
        name="senha"
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
      {isLoading ? <LoadingOverlay /> : <Text />}
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
      {/* <Button
        icon="login"
        mode="contained"
        style={styles.button}
        onPress={onBypassLoginPressed}>
        Log In
      </Button> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  input: {
    width: 350,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  links: {
    marginTop: 20,
    color: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
});
