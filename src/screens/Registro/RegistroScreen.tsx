/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';
import {Appbar, HelperText, Text, TextInput} from 'react-native-paper';
import Home from '../Home/Home';

export function RegistroScreen({props}: any, {navigation}: any) {
  const [hasAvatar, setHasAvatar] = React.useState(props);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');

  const emailError = () => {
    if (!email.includes('@') && email.length > 0) {
      return !email.includes('@');
    }
    console.log(email);
  };

  return (
    <View style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/rwIARcq.webp')}
      />
      <TextInput
        label="Email"
        value={email}
        style={styles.input}
        onChangeText={email => setEmail(email)}
      />
      <HelperText style={{color: 'white'}} type="error" visible={emailError()}>
        Endereço de e-mail inválido
      </HelperText>

      <TextInput
        label="Senha"
        value={password}
        style={styles.input}
        secureTextEntry={true}
        onChangeText={password => setEmail(password)}
      />

      <Text
        style={styles.links}
        onPress={() => Linking.openURL('http://google.com')}>
        Esqueceu a senha?
      </Text>
      <Text style={styles.links} onPress={() => navigation.navigate(Home)}>
        Não possui conta? clique aqui!
      </Text>
    </View>
  );
}

export default RegistroScreen;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  input: {
    //height: 40,
    width: 300,
  },
  button: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  links: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
});
