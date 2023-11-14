import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import { RegistroScreenNavigationProp } from '../../types/types';

export const RegistroScreen: React.FC<{ navigation: RegistroScreenNavigationProp }> = ({ navigation }) => {
 
  const onRegisterPressed = (data: any) => {
    // Validate User
    console.log(data);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.centerView}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.webp')}
      />

      {/* <ControlTextInput
        control={control}
        name="confirmarSenha"
        rules={{
          validade: (value: string, formValues: any) =>
            value === watchSenha || 'As senhas não conferem',
        }}
        style={styles.input}
        secureTextEntry={true}
        label="Confirmar Senha"
      /> */}

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
    //height: 40,
    marginBottom: 10,
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
