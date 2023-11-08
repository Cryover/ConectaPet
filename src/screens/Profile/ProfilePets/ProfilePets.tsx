/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type Pet = {
  id: string;
  nome: string;
  tipoAnimal: string;
  idade: number;
  imagem: string; // Testar o type do dado
  dataNascimento: Date;
  raca: string;
  infoMedica: InfoMedica;
};

type InfoMedica = {
  alergias: string;
  tipoSanguineo: string;
};

export function ProfilePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const petsArray: Pet[] = [
    {
      id: '1',
      nome: 'Kabosu',
      raca: 'Shiba',
      idade: 3,
      tipoAnimal: 'Cachorro',
      imagem: '../../../assets/images/avatar.webp',
      dataNascimento: new Date('10/09/2020'),
      infoMedica: {
        alergias: 'Batata Doce',
        tipoSanguineo: 'DEA 1',
      },
    },
    {
      id: '2',
      nome: 'Will',
      raca: 'Dálmata',
      idade: 4,
      tipoAnimal: 'Cachorro',
      imagem: '../../../assets/images/dalmata.webp',
      dataNascimento: new Date('10/09/2020'),
      infoMedica: {
        alergias: 'Batata Doce',
        tipoSanguineo: 'DEA 1',
      },
    },
    {
      id: '3',
      nome: 'Elias',
      raca: 'Persa',
      idade: 2,
      tipoAnimal: 'Gato',
      imagem: '../../../assets/images/gatoPersa.webp',
      dataNascimento: new Date('10/09/2020'),
      infoMedica: {
        alergias: 'Batata Doce',
        tipoSanguineo: 'DEA 1',
      },
    },
    {
      id: '4',
      nome: 'Tupa',
      raca: 'Papagaio-de-cara-roxa',
      idade: 2,
      tipoAnimal: 'Papagaio',
      imagem: '../../../assets/images/papagaio.webp',
      dataNascimento: new Date('10/09/2020'),
      infoMedica: {
        alergias: 'Batata Doce',
        tipoSanguineo: 'DEA 1',
      },
    },
  ];

  /* const processArray = async () => {
    const mappedArray = await Promise.all(
      dataArray.map(async item => {
        return await setPets(item);
      }),
    );

    // Now you can work with the mappedArray which contains the results of the async operations
  }; */

  useEffect(() => {

    try {
      setLoading(true);
      //const response = await axiosInstance.post(`/pets/${idDono}`);
      //const token = response.data.token; // Replace with the actual response structure





      // Store the token in a secure way, such as in local storage or a state management system
      //await AsyncStorage.getItem()

      setLoading(false);
    } catch (err) {
      setError('Nome do usuário ou senha incorreto.\n Tente novamente.');
      setLoading(false);
      console.log(err);
    }


    setPets(petsArray);
  }, []);

  return (
    <ScrollView>
      <View style={styles.cardContainer}>
        {pets && pets.length > 0 ? (
          pets.map((pet) => (
            <Card key={pet.id} style={styles.card}>
              <Card.Cover
                style={{ width: 'auto' }}
                source={require('../../../assets/images/avatar.webp')}
              />
              <Card.Title title={pet.nome} subtitle={pet.raca} />
              <Card.Content>
                <Text variant="bodyLarge">Nome: {pet.nome}</Text>
                <Text variant="bodyLarge">
                  Idade: {pet.dataNascimento.toDateString()}
                </Text>
                <Text variant="bodyLarge">Raça: {pet.raca}</Text>
                <Text variant="bodyLarge">
                  Tipo Sanguíneo: {pet.infoMedica.tipoSanguineo}
                </Text>
                <Text variant="bodyLarge">
                  Alergias: {pet.infoMedica.alergias}
                </Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          // Render a message or component when pets is empty or null
          <Text>Nenhum Pet Cadastrado</Text>
        )}
      </View>
    </ScrollView>
  );
}

export default ProfilePets;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    padding: 20,
    gap: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '48%',
    height: 'auto',
  },
});
