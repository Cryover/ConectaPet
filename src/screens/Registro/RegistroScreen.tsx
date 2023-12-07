import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {RegistroScreenNavigationProp, User} from '../../types/types';
import {useForm} from 'react-hook-form';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import axiosInstance from '../../utils/axiosIstance';
import {useToast} from '../../contexts/toastContext';

export const RegistroScreen: React.FC<{
  navigation: RegistroScreenNavigationProp;
}> = ({navigation}) => {
  const {control, handleSubmit} = useForm();
  const {showToast} = useToast();

  const onRegisterPressed = async (dataFields: any) => {
    try {
      console.log(dataFields);
      await axiosInstance
        .post('/login/registrar', dataFields)
        .then(response => {
          const newUser: User = response.data;
          console.log('newUser', newUser);
          showToast(
            'success',
            'Conta criada! Faça Login para poder acessar o app',
          );
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
          showToast('error', `Erro ao cadastrar novo usuario - ${err}`);
        });
    } catch (err) {
      showToast('error', `Erro ao cadastrar novo usuario - ${err}`);
      console.log(err);
    }
  };

  return (
    <View style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.webp')}
      />
      <ControlTextInput
        name={'username'}
        label={'Nome de usuário'}
        mode={'flat'}
        control={control}
        rules={{
          required: 'Nome de usuário Obrigatório',
          maxLength: {
            value: 20,
            message: 'Nome de usuário deve ter no máximo 20 caracteres',
          },
          minLength: {
            value: 6,
            message: 'Nome de usuário deve ter no mínimo 6 caracteres',
          },
        }}
        style={styles.input}
        secureTextEntry={false}
      />

      <ControlTextInput
        name={'password'}
        label={'Senha'}
        mode={'flat'}
        control={control}
        rules={{
          required: 'Senha Obrigatória',
          maxLength: {
            value: 20,
            message: 'A senha deve ter no máximo 20 caracteres',
          },
          minLength: {
            value: 6,
            message: 'A senha deve ter no mínimo 6 caracteres',
          },
        }}
        style={styles.input}
        secureTextEntry={true}
      />
      <ControlTextInput
        name={'email'}
        label={'Email'}
        mode={'flat'}
        control={control}
        rules={{
          required: 'Email Obrigatório',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Endereço de email inválido',
          },
        }}
        style={styles.input}
        secureTextEntry={false}
      />
      <ControlTextInput
        name={'nome'}
        label={'Nome (Opcional)'}
        mode={'flat'}
        control={control}
        rules={undefined}
        style={styles.input}
        secureTextEntry={false}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onRegisterPressed)}>
        Registrar
      </Button>
    </View>
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
