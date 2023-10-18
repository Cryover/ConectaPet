/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {styles} from './Styles';
import {HelperText, TextInput} from 'react-native-paper';
import {LogBox} from 'react-native';

function Login({navigation, route}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {setUserToken} = route.params;

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
      <Text
        style={styles.links}
        onPress={() => Linking.openURL('http://google.com')}>
        Não possui conta? clique aqui!
      </Text>
      <Button
        icon="login"
        mode="contained"
        style={styles.button}
        onPress={() => setUserToken('token')}>
        Log In
      </Button>
    </View>
  );
}

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default Login;
