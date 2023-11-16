/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

type user = {
  id: string;
  nome: string;
  idade: number;
  dataNascimento: Date;
  raca: string;
  infoMedica: InfoMedica;
};

type InfoMedica = {
  alergias: string;
  tipoSanguineo: string;
};

export function ProfileDonoScreen() {
  const [user, setUser] = React.useState({
    id: '1',
    nome: 'Evandro',
    sobreNome: 'Barros',
    email: 'evandro.barro@gmail.com',
    senha: '',
  });
  const [hasAvatar, setHasAvatar] = React.useState();

  return (
    <SafeAreaView style={{marginTop: 20}}>
      <Card key={user.id} style={{marginBottom: 20}}>
        <Card.Cover
          style={{width: 'auto'}}
          source={require('../../../assets/images/avatar.webp')}
        />
        <Card.Title title={user.nome} subtitle={user.sobreNome} />
        <Card.Content>
          {/* <Text variant="bodyLarge">Nome: {user.nome}</Text>
          <Text variant="bodyLarge">Idade: {user.dataNascimento}</Text>
          <Text variant="bodyLarge">Raça: {user.raca}</Text>
          <Text variant="bodyLarge">
            Tipo Sanguíneo: {user.infoMedica.tipoSanguineo}
          </Text>
          <Text variant="bodyLarge">Alergias: {user.infoMedica.alergias}</Text> */}
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

export default ProfileDonoScreen;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
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
});
