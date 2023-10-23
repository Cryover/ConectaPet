/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {Image, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';

export function RecuperacaoContaScreen({navigation}: any) {
  const [email, setEmail] = React.useState('');

  const emailError = () => {
    if (!email.includes('@') && email.length > 0) {
      return !email.includes('@');
    }
    console.log(email);
  };

  return (
    <View>
      <Image source={require('../../assets/images/rwIARcq.webp')} />

      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <HelperText style={{color: 'white'}} type="error" visible={emailError()}>
        Endereço de e-mail inválido
      </HelperText>

      <Button icon="login" mode="contained">
        Registrar
      </Button>
    </View>
  );
}

export default RecuperacaoContaScreen;
