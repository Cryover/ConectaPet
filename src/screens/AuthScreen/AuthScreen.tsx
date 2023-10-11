/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, Text, TextInput, View} from 'react-native';
import React from 'react';
import {styles} from './Styles';

function AuthScreen({navigation, route}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setUserToken} = route.params;

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        autoComplete="email"
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        autoComplete="password"
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={() => setUserToken('token')} />
    </View>
  );
}

export default AuthScreen;
