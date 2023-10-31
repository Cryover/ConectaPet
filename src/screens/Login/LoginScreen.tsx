/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FieldValues, useForm} from 'react-hook-form';
import ControlTextInput from '../../components/atoms/controller/ControlTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/actions/actions';

const LoginScreen = () => {
  //const {setUserToken} = route.params;
  const navigation: any = useNavigation();
  const {control, handleSubmit} = useForm();
  const EMAIL_REGEX: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //onst dispatch = useDispatch();
  //const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
  //const loginError = useSelector((state: RootState) => state.loginError);

  const apiUrl = process.env.API_URL;

  const onLoginPressed = async (data: FieldValues) => {
    const authenticationEndpoint = 'https://api.example.com/login';

    // Define custom headers if needed
    const customHeaders = {
      Authorization: 'Bearer YourAccessToken',
      'X-Custom-Header': 'Custom-Value',
    };
    // TODO verificar como usar o redux aqui
    //dispatch(login(authenticationEndpoint, username, password, customHeaders));
    console.log(data);
  };

  const onBypassLoginPressed = () => {
    navigation.navigate('Home');
  };

  const count = useSelector(state => state);
  const dispatch = useDispatch();

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
          required: 'Email Obrigatório',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Email Invalido',
          },
        }}
        style={styles.input}
        label="Nome de Usuário"
        secureTextEntry={false}
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
        label="Senha"
      />

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

      {/* <Button
        icon="login"
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onLoginPressed)}>
        Log In
      </Button> */}
      <Button
        icon="login"
        mode="contained"
        style={styles.button}
        onPress={onBypassLoginPressed}>
        Log In
      </Button>
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
