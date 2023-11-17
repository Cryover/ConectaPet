/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  View,
  GestureResponderEvent,
  Image,
  SafeAreaView,
} from 'react-native';
import {useAuthContext} from '../../../contexts/authContext';
import axiosInstance from '../../../utils/axiosIstance';
import {Pet, SelectOptionEntry} from '../../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../../../components/Modal/CustomModal';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import CustomFabButton from '../../../components/Buttons/CustomFabButton';
import ControlSelectInput from '../../../components/atoms/inputs/ControlSelectInput';
import ControlTextInput from '../../../components/atoms/inputs/ControlTextInput';
import {useForm} from 'react-hook-form';

export function ProfilePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const {user, userToken} = useAuthContext();
  const [isExtended, setIsExtended] = useState(true);

  //const { userInfo } = useAuthContext();
  const {control, handleSubmit} = useForm();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const getPetsByOwner = async () => {
    try {
      //console.log('user in pets', user);

      if (user) {
        const response = await axiosInstance.get(`/pets/byOwner/${user.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.status === 200) {
          const formatedPets: Pet[] = response.data;
          console.log('formatedPets', response.data);
          setPets(formatedPets);
        } else if (response.status === 401) {
          //navi
        }
      } else {
        setError('Nenhum pet cadastrado neste perfil.');
      }
    } catch (err) {
      setError('Erro ao buscar pets de dono.');
      console.log(err);
    }
  };

  const registerPet = async (formData: any) => {
    /*  try {
      //console.log('userInfo', userInfo);
      console.log('formData', formData);
      //const pet = await AsyncStorage.getItem('petInfo');
      console.log('userTeste', userTeste);
      if (userTeste) {
        const formattedPet: Pet = JSON.parse(userTeste);
        console.log('userTeste', formattedPet);
      }
      if (user) {
        const response = await axiosInstance.post(`/pets/${user.id}`);
        console.log('pet response', response);
        //setPets(response);
        //const petInfo = await AsyncStorage.setItem('petInfo', response.data);
      } else {
        throw new Error('ID de dono nao encontrado');
      }
    } catch (err) {
      setError('Nome do usuário ou senha incorreto.\n Tente novamente.');
      console.log(err);
    } */
  };

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const handleClick = (event: GestureResponderEvent): void => {
    // Some logic here
    console.log('Button pressed');
    setIsCollapsed(!isCollapsed);
    /* if (event) {
      onPress(event);
    } */
  };

  useEffect(() => {
    getPetsByOwner();
  }, [setPets]);

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
    <View>
      <ScrollView>
        <View style={styles.cardContainer}>
          {pets && pets.length > 0 ? (
            pets.map(pet => (
              <Card key={pet.id} style={styles.card}>
                <Card.Cover
                  style={{width: 'auto'}}
                  source={require('../../../assets/images/avatar.webp')}
                />
                <Card.Title title={pet.nome} subtitle={pet.raca} />
                <Collapsible collapsed={isCollapsed}>
                  <Card.Content>
                    <Text variant="bodyLarge">Tipo: {pet.tipo_pet}</Text>
                    <Text variant="bodyLarge">Raça: {pet.raca}</Text>
                    <Text variant="bodyLarge">
                      Data Nasc.:{' '}
                      {moment(pet.dataNascimento).format('DD/MM/YYYY')}
                    </Text>
                    <Text variant="bodyLarge">
                      Tipo Sanguíneo: {pet.infoMedica?.tipoSanguineo}
                    </Text>
                    <Text variant="bodyLarge">
                      Alergias: {pet.infoMedica?.alergias}
                    </Text>
                  </Card.Content>
                </Collapsible>
              </Card>
            ))
          ) : (
            <View style={styles.notFound}>
              <Image
                style={styles.sadDoge}
                source={require('../../../assets/images/sadDoge.webp')}
              />
              <Text>{error}</Text>
              <Button
                icon="plus"
                mode="contained"
                style={styles.button}
                onPress={toggleModal}>
                Cadastrar Pet
              </Button>
            </View>
          )}

          <CustomModal
            visible={visibleModal}
            onDismiss={hideModal}
            containerStyle={styles.containerStyle}>
            <Text
              variant="titleMedium"
              style={[styles.textCenter, {marginBottom: 10}]}>
              Cadastro de Pet
            </Text>
            <ControlTextInput
              name={'nome'}
              label={'Nome'}
              mode={'outlined'}
              control={control}
              rules={{required: 'Nome de Pet Obrigatório'}}
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
              rules={{required: 'Raça de pet Obrigatório'}}
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
                onPress={handleSubmit(registerPet)}>
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
          <CustomFabButton
            visible={true}
            style={styles.fabStyle}
            isExtended={isExtended}
            onPress={showModal}
            label={'Add Despesa'}
            animateFrom={'right'}
          />
        </View>
      </ScrollView>
    </View>
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
    display: 'flex',
    overflowX: 'auto',
    width: '90%',
    height: 'auto',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    textColor: 'white',
    backgroundColor: '#5D6BB0',
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
    height: 550,
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
