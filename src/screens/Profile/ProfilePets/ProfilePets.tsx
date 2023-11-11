/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useAuthContext } from '../../../contexts/authContext';
import axiosInstance from '../../../utils/axiosIstance';
import { PetInfo, SelectOptionEntry, UserInfo } from '../../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../../../components/Modal/CustomModal';
import ControlTextInput from '../../../components/atoms/controller/ControlTextInput';
import { useForm } from 'react-hook-form';
import ControlSelectInput from '../../../components/atoms/controller/ControlSelectInput';

const petsArray: PetInfo[] = [
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

export function ProfilePets() {
  const [pets, setPets] = useState<PetInfo[]>([]);
  const [error, setError] = useState('');
  const { userInfo } = useAuthContext();
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const { control, handleSubmit } = useForm();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const getPetsByOwner = async () => {
    try {
      console.log('userInfo', userInfo);
      const userTeste = await AsyncStorage.getItem('userInfo');
      if (userTeste) {
        const formattedUser: UserInfo = JSON.parse(userTeste);
      }
      //console.log('userTeste', formattedUser);
      if (userInfo?.id) {
        const response = await axiosInstance.post(`/pets/${userInfo.id}`);
        console.log('pet response', response);
        //setPets(response);
        //const petInfo = await AsyncStorage.setItem('petInfo', response.data);
      } else {
        throw new Error('ID de dono nao encontrado');
      }

    } catch (err) {
      setError('Nome do usuário ou senha incorreto.\n Tente novamente.');
      console.log(err);
    }
  };

  const registerPet = async (formData:any) => {
    try {
      console.log('userInfo', userInfo);
      console.log('formData', formData);
      const userTeste = await AsyncStorage.getItem('userInfo');
      console.log('userTeste', userTeste);
      if (userTeste) {
        const formattedPet: PetInfo = JSON.parse(userTeste);
        console.log('userTeste', formattedPet);
      }
      if (userInfo?.id) {
        const response = await axiosInstance.post(`/pets/${userInfo.id}`);
        console.log('pet response', response);
        //setPets(response);
        //const petInfo = await AsyncStorage.setItem('petInfo', response.data);
      } else {
        throw new Error('ID de dono nao encontrado');
      }

    } catch (err) {
      setError('Nome do usuário ou senha incorreto.\n Tente novamente.');
      console.log(err);
    }
  };

  useEffect(() => {
    getPetsByOwner();
  }, []);

  const tiposAnimais: SelectOptionEntry[] = [
    {
      label: 'Cachorro',
      value: 'cachorro',
    },
    {
      label: 'Gato',
      value: 'gato',
    },
    {
      label: 'Ave',
      value: 'ave',
    },
    {
      label: 'Roedor',
      value: 'roedor',
    },
    {
      label: 'Outro',
      value: 'outro',
    },
  ];

  const sexoAnimais: SelectOptionEntry[] = [
    {
      label: 'Macho',
      value: 'Macho',
    },
    {
      label: 'Fêmea',
      value: 'femea',
    },
  ];

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
                  Tipo Sanguíneo: {pet.infoMedica?.tipoSanguineo}
                </Text>
                <Text variant="bodyLarge">
                  Alergias: {pet.infoMedica?.alergias}
                </Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <View style={styles.notFound}>
            <Image
              style={styles.sadDoge}
              source={require('../../../assets/images/sadDoge.webp')}
            />
            <Text>Nenhum Pet Cadastrado</Text>
            <Button
                icon="plus"
                mode="contained"
                style={styles.button}
                onPress={showModal}>
                Cadastrar Pet
            </Button>
            <CustomModal
              visible={visibleModal}
              onDismiss={hideModal}
              containerStyle={styles.containerStyle}>
              <Text
                variant="titleMedium"
                style={[styles.textCenter, { marginBottom: 10 }]}>
                Cadastro de Pet
              </Text>
              <ControlTextInput
                name={'nome'}
                label={'Nome'}
                mode={'outlined'}
                control={control}
                rules={{ required: 'Nome de Pet Obrigatório' }}
                style={styles.input}
                secureTextEntry={false}
              />
              <ControlSelectInput
                  control={control}
                  name={'tipoPet'}
                  options={tiposAnimais}
                  label={'Tipo de Pet'}
              />
              <ControlTextInput
                name={'raca'}
                label={'Raça'}
                mode={'outlined'}
                control={control}
                rules={{ required: 'Raça de pet Obrigatório' }}
                style={styles.input}
                secureTextEntry={false}
              />
              <ControlSelectInput
                  control={control}
                  name={'sexo'}
                  options={sexoAnimais}
                  label={'Sexo de Pet'}
              />
              <View style={styles.divButtons}>
                <Button
                  icon="plus"
                  mode="outlined"
                  style={styles.button}
                  onPress={handleSubmit(registerPet)}
                >
                  Registrar Item
                </Button>
                <Button
                  icon="cancel"
                  mode="outlined"
                  style={styles.button}
                  onPress={hideModal}>
                  Cancelar
                </Button>
              </View>
            </CustomModal>

          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default ProfilePets;

const styles = StyleSheet.create<any>({
  cardContainer: {
    borderRadius: 10,
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
  notFound: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    gap: 20,
    flexDirection: 'column',
  },
  sadDoge: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  containerStyle: {
    backgroundColor: 'white',
    gap: 5,
    width: '80%',
    borderRadius: 5,
    height: 500,
    alignSelf: 'center',
    padding: 15,
  },
  textCenter: {
    textAlign: 'center',
  },
  divButtons: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  button: {
    color: '#5D6BB0',
  },
  input: {
    width: '100%',
    height: 50,
  },
});
