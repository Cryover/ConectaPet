import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export function RecuperacaoContaScreen() {
  const [code, setCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const {control, handleSubmit} = useForm();

  return (
    <View>
      <Image source={require('../../assets/images/rwIARcq.webp')} />

      <TextInput
        label="Código recebido no email"
        value={code}
        onChangeText={() => setCode(code)}
      />
      <TextInput
        label="Nova Senha"
        value={newPassword}
        onChangeText={() => setNewPassword(newPassword)}
      />

      <Button icon="login" mode="contained">
        Registrar
      </Button>
    </View>
  );
}

export default RecuperacaoContaScreen;
