/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import ControlTextInput from '../../components/atoms/controller/ControlTextInput';
import axiosInstance from '../../utils/axiosIstance';
import Loading from '../../components/atoms/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UsuarioInfo = {
  usuario: {
    username: string,
    email: string,
    nome: string,
    senha: string,
    id: string,
    tipo_usuario: string,
    criado_em: Date
  }
}

const LoginScreen = () => {
  //const {setUserToken} = route.params;
  const navigation: any = useNavigation();
  const {control, handleSubmit} = useForm();
  const EMAIL_REGEX: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const onLoginPressed = async (dataFields: any) => {
    console.log(dataFields);
    console.log(process.env.API_DEV_URL);

    //dataFields.username:
    try {
      setLoading(true);
      const response = await axiosInstance.post('/login', dataFields);
      const userToken = response.data.userToken; // Replace with the actual response structure

      console.log('teste', JSON.stringify(response.data, null, 2));

      if (userToken){
        const usuarioInfo:string = response.data.usuario;
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('usuarioInfo', usuarioInfo);
        console.log('usuarioInfo',usuarioInfo);
        navigation.navigate('Home');
      }
      setLoading(false);
    } catch (err) {
      setError('Nome do usuário ou senha incorreto.\n Tente novamente.');
      setLoading(false);
      console.log(err);
    }
  };

  const onBypassLoginPressed = () => {
    navigation.navigate('Home');
  };

  //const count = useSelector(state => state);
  //const dispatch = useDispatch();

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

      {/* {loading ? (
        <Loading />
      ) : (
        <Text style={{color:'red', textAlign: 'center'}}>{error}</Text>
      )} */}
      <Text style={{color:'red', textAlign: 'center'}}>{error}</Text>

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

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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
