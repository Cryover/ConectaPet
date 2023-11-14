import React, { useState} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {Button, HelperText, Text, TextInput } from 'react-native-paper';
import {useAuthContext} from '../../contexts/authContext';
import {LoginScreenNavigationProp} from '../../types/types';
import {Form, useFormState} from 'react-native-use-form';

const LoginScreen: React.FC<{navigation: LoginScreenNavigationProp}> = ({
  navigation,
}) => {
  const [error, setError] = useState('');
  const {logIn} = useAuthContext();

  const [{submit, formProps}, {username, password}] =
    useFormState(
      {
        username: '',
        password: '',
      },
      {
        onSubmit: async submittedValues => {
          try {
            console.log(submittedValues);
            const isLogged = await logIn(submittedValues);
            console.log('isLogged', isLogged);
            if (isLogged) {
              navigation.navigate('Home');
            } else {
              setError(
                'Nome do usuário ou password incorreto.\n Tente novamente.',
              );
            }
          } catch (err) {
            console.log(err);
            setError('Nome do usuário ou password incorreto.\n Tente novamente.');
          }
        },
      },
    );

  return (
    <View
      style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.webp')}
      />
      <Form {...formProps}>
        <TextInputWithError
          mode="flat"
          {...username('username', {
            label: 'Nome de usuário ou Email',
          })}        />
        <TextInputWithError
          mode="flat"
          {...password('password', {
            label: 'Senha',
          })}
        />
        <Text>{error}</Text>
        <Text
          style={styles.links}
          onPress={() => navigation.navigate('RecuperacaoConta')}>
          Esqueceu a password?
        </Text>
        <Text
          style={styles.links}
          onPress={() => navigation.navigate('Registro')}>
          Não possui conta? clique aqui!
        </Text>
        <Button mode="contained" onPress={submit}>
          Entrar
        </Button>
      </Form>
    </View>
  );
};

interface TextInputWithErrorProps extends React.ComponentProps<typeof TextInput> {
  errorMessage?: string;
}

const TextInputWithError: React.FC<TextInputWithErrorProps> = ({
  errorMessage,
  ...rest
}) => (
  <>
    <TextInput style={styles.input} {...rest} />
    <HelperText style={styles.helperText} type="error" visible={rest.error}>
      {errorMessage || ' '}
    </HelperText>
  </>
);

export default LoginScreen;

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  input: {
    width: '80%',
  },
  button: {
    color: '#5D6BB0',
  },
  links: {
    marginTop: 0,
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
