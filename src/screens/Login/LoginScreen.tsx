/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {HelperText, TextInput} from 'react-native-paper';
import {LogBox} from 'react-native';

function LoginScreen({navigation, route}: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setUserToken} = route.params;

  const onLoginPressed = () => {
    // Validate User
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

      <TextInput
        label="Senha"
        value={password}
        style={styles.input}
        secureTextEntry={true}
        onChangeText={password => setEmail(password)}
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

      <Button
        icon="login"
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        Log In
      </Button>
    </View>
  );
}

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default LoginScreen;

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
    color: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
});
