/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View} from 'react-native';
import {Appbar, Avatar, Text} from 'react-native-paper';
import GlobalStyles from '../../styles/Style';

export function Profile({props}: any) {
  const [user, setUser] = React.useState({
    nome: 'Evandro',
    sobreNome: 'Barros',
    email: 'evandro.barro@gmail.com',
    senha: '',
  });

  const infoMedica = {
    alergias: 'Amendoim, Alimentos Transgênicos',
    tipoSanguineo: 'DEA 1',
  };

  const [pet, setPet] = React.useState({
    nome: 'Evandro',
    dataNascimento: 'Barros',
    raca: 'Raça não definida',
    tipoAnimal: 'Cachorro',
    sexo: 'Fêmea',
    infoMedica: infoMedica,
  });

  const [hasAvatar, setHasAvatar] = React.useState(props);
  return (
    <View style={[GlobalStyles.centerView, {marginTop: 20}]}>
      {hasAvatar ? (
        // No avatar found, user did not upload an avatar image
        <Avatar.Image
          style={GlobalStyles.centerItem}
          size={128}
          source={require('../../assets/images/avatar.webp')}
        />
      ) : (
        // User is signed in
        <Avatar.Image
          size={128}
          source={require('../../assets/images/defaultAvatar.webp')}
        />
      )}

      <Text variant="titleLarge">Nome: {pet.nome}</Text>
      <Text variant="titleLarge">Data Nasc:{pet.dataNascimento}</Text>
      <Text variant="titleLarge">Raça: {pet.raca}</Text>
      <Text variant="titleLarge">
        Tipo Sanguíneo: {pet.infoMedica.tipoSanguineo}
      </Text>
      <Text variant="titleLarge">Alergias: {pet.infoMedica.alergias}</Text>
    </View>
  );
}

export default Profile;
