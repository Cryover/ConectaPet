/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {useAuthContext} from '../../../contexts/authContext';
import {
  Pet,
  ProfilePetsScreenNavigationProp,
  SelectOptionEntry,
} from '../../../types/types';
import CustomModal from '../../../components/Modal/CustomModal';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import CustomFabButton from '../../../components/Buttons/CustomFabButton';
import ControlTextInput from '../../../components/atoms/inputs/ControlTextInput';
import ControlDateInput from '../../../components/atoms/inputs/ControlDateInput';
import {useForm} from 'react-hook-form';
import ControlSelectInput from '../../../components/atoms/inputs/ControlSelectInput';
import {useLoading} from '../../../contexts/loadingContext';
import axiosInstance from '../../../utils/axiosIstance';
import LoadingOverlay from '../../../components/atoms/LoadingOverlay';
import {useToast} from '../../../contexts/toastContext';
import Toast from 'react-native-toast-message';

const tiposAnimais: SelectOptionEntry[] = [
  {
    label: 'Cachorro',
    value: 'Cachorro',
  },
  {
    label: 'Gato',
    value: 'Gato',
  },
  {
    label: 'Ave',
    value: 'Ave',
  },
  {
    label: 'Roedor',
    value: 'Roedor',
  },
  {
    label: 'Outro',
    value: 'Outro',
  },
];

const sexoAnimais: SelectOptionEntry[] = [
  {
    label: 'Macho',
    value: 'Macho',
  },
  {
    label: 'Fêmea',
    value: 'Fêmea',
  },
];

const racasCachorro = [
  'Akita',
  'Basset hound',
  'Beagle',
  'Bichon frisé',
  'Boiadeiro australiano',
  'Border collie',
  'Boston terrier',
  'Boxer Alto',
  'Buldogue francês',
  'Buldogue inglês',
  'Bull terrier',
  'Cane corso',
  'Cavalier king',
  'Chihuahua',
  'Chow chow',
  'Cocker spaniel',
  'Dachshund',
  'Dálmata',
  'Doberman',
  'Dogo argentino',
  'Dogue alemão',
  'Fila brasileiro',
  'Golden retriever',
  'Husky siberiano',
  'Jack russell terrier',
  'Labrador retriever',
  'Lhasa apso',
  'Lulu da pomerânia',
  'Maltês',
  'Mastiff',
  'Mastim tibetano',
  'Pastor alemão',
  'Pastor australiano',
  'Pastor de Shetland',
  'Pequinês',
  'Pinscher',
  'Pit bull',
  'Poodle',
  'Pug',
  'Rottweiler',
  'Schnauzer',
  'Shar-pei',
  'Shiba',
  'Shih tzu',
  'Staffordshire bull terrier',
  'Weimaraner',
  'Yorkshire',
];

const optionsRacasCachorro = racasCachorro.map(raca => ({
  label: raca,
  value: raca,
}));

const racasGato = [
  'Abissínio',
  'Angorá turco',
  'Asiático de Pelo Semi-Longo',
  'Azul Russo',
  'Balinês Balinese',
  'Bambino',
  'Bicolor Oriental',
  'Bobtail americano',
  'Bobtail japonês',
  'Bombaim',
  'Burmês',
  'Burmila',
  'California Spangled',
  'Cingapura',
  'Chartreux',
  'Chausie',
  'Colorpoint de pelo curto',
  'Cornish Rex',
  'Curl Americano',
  'Devon Rex',
  'Donskoy Donskoy',
  'Dragon Li',
  'Egeu',
  'Gato-de-Bengala',
  'Gato do Chipre',
  'Exótico',
  'Gato asiático',
  'Gato Siberiano',
  'Havana marrom',
  'Himalaio',
  'Javanês',
  'Korat',
  'Khao Manee',
  'Kurilian Bobtail',
  'LaPerml LaPerm',
  'Levkoy ucraniano',
  'Lykoi',
  'Maine Coon',
  'Manx',
  'Manx de pelo longo',
  'Mau Árabe',
  'Mau egípcio',
  'Minskin',
  'Mist Australiano',
  'Munchkin',
  'Nebelung',
  'Norueguês da Floresta',
  'Ocicat',
  'Ojos Azules',
  'Oregon Rex',
  'Pelo curto americano',
  'Pelo curto brasileiro',
  'Pelo curto Europeu',
  'Pelo curto inglês',
  'Pelo longo Inglês',
  'Pelo curto Oriental',
  'Pelo longo Oriental',
  'Persa',
  'Peterbald',
  'Pixie-bob',
  'Raas',
  'Ragamuffin',
  'Ragdoll',
  'Rex Alemão',
  'Sagrado da Birmânia',
  'Savannah',
  'Scottish Fold',
  'Selkirk Rex',
  'Serengeti',
  'Siamês',
  'Singapura',
  'Snowshoe',
  'Sokoke',
  'Somali',
  'Sphynx',
  'Suphalak',
  'Thai',
  'Tiffany-Chantilly',
  'Tonquinês',
  'Toyger',
  'Van Turco',
  'Wirehair Americano',
];

const optionsRacasGato = racasGato.map(raca => ({
  label: raca,
  value: raca,
}));

const ProfilePetsScreen: React.FC<{
  navigation: ProfilePetsScreenNavigationProp;
}> = ({navigation}) => {
  let [pets, setPets] = useState<Pet[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const {user, userToken, setUserToken} = useAuthContext();
  const {startLoading, stopLoading, isLoading} = useLoading();
  const {showToast} = useToast();
  const [isExtended, setIsExtended] = useState(true);
  const [petSelected, setPetSelected] = useState<string>();
  const {control, handleSubmit, getValues} = useForm();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const showConfirmModal = (petId: string) => {
    setPetSelected(petId);
    setVisibleConfirmModal(true);
  };
  const hideConfirmModal = () => setVisibleConfirmModal(false);

  const showEditModal = (petId: string) => {
    setPetSelected(petId);
    setVisibleEditModal(true);
  };
  const hideEditModal = () => setVisibleEditModal(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tipoPet, setTipoPet] = useState<string>('Cachorro');

  const getPetsByOwner = async () => {
    try {
      startLoading();

      if (user) {
        const response = await axiosInstance.get(`/pets?id=${user.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.status === 200) {
          const formatedPets: Pet[] = response.data;
          console.log('formatedPets', response.data);

          console.log('DAta', response.data.data_nascimento);

          setPets(formatedPets);
        } else if (response.status === 401) {
          setUserToken(null);
        }
      } else {
        showToast('info', 'Nenhum pet cadastrado neste perfil.');
      }
    } catch (err) {
      showToast('error', `Erro ${err} ao buscar pets de dono.`);
    } finally {
      stopLoading();
    }
  };

  const formatAsyncDate = async (date: any) => {
    if (!date) {
      console.log('Undefined');
      return 'Indefinido';
    }

    try {
      // Attempt to format the date using moment
      const formattedDate = moment(date).format('YYYY-MM-DD'); // Adjust the format as needed
      console.log('Error formatting date:', formattedDate);
      return formattedDate;
    } catch (error) {
      console.log('Error formatting date:', error);
      console.error('Error formatting date:', error);
      return 'Indefinido';
    }
  };

  const registerPet = async (formData: any) => {
    try {
      startLoading();
      console.log('formData', formData);
      //console.log('user', user);
      //console.log('userToken', userToken);
      //console.log('user', user?.id);

      const response = await axiosInstance.post(
        `/pets?id=${user?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (response.status === 401) {
        setUserToken(null);
      }

      hideModal();
      getPetsByOwner();
    } catch (err) {
      showToast('error', `Erro ${err} ao Registrar novo Pet`);
    } finally {
      stopLoading();
    }
  };

  const deletePet = async () => {
    try {
      startLoading();

      const response = await axiosInstance.delete(`/pets?id=${petSelected}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        showToast('success', 'Pet Deletado com sucesso');
        hideConfirmModal();
        getPetsByOwner();
      } else if (response.status === 401) {
        showToast('error', 'Token Expirado, favor facer Login novamente');
        setUserToken(null);
      }
    } catch (err) {
      showToast('error', 'Erro ao buscar pets de dono.');
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  const onScroll = ({nativeEvent}: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const handleTipoPetChange = (value: string) => {
    console.log('Tipo de Pet changed to:', value);
    setTipoPet(getValues('tipo_pet'));
  };

  const editPet = async (dataFields: any) => {
    try {
      startLoading();
      console.log('petEdit fields', dataFields);
      await axiosInstance
        .patch(`/pets/?id=${petSelected}`, dataFields, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          if (response.status === 200) {
            showToast('success', 'Pet atualizado com sucesso!');
            hideEditModal();
            getPetsByOwner();
          } else if (response.status === 401) {
            setUserToken(null);
            navigation.navigate('Login');
          }
        })
        .catch(err => {
          showToast('error', `${err}`);
        });
    } catch (err) {
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getPetsByOwner();
  }, []);

  const setPetImagePlaceHolder = (petTipo: string) => {
    let petTipoImage;
    switch (petTipo) {
      case 'Cachorro':
        petTipoImage = require('../../../assets/images/cachorro.webp');
        break;
      case 'Gato':
        petTipoImage = require('../../../assets/images/gato.webp');
        break;
      case 'Ave':
        petTipoImage = require('../../../assets/images/ave.webp');
        break;
      case 'Roedor':
        petTipoImage = require('../../../assets/images/roedor.webp');
        break;
      default:
        petTipoImage = require('../../../assets/images/defaultAvatar.webp');
        break;
    }
    return petTipoImage;
  };

  const getDiffIdade = (dataNasc: string) => {
    return moment().diff(dataNasc, 'years');
  };

  return (
    <View>
      <ScrollView onScroll={onScroll}>
        <View style={styles.cardContainer}>
          {pets && pets.length > 0 ? (
            pets?.map(pet => (
              <Card key={pet.id} style={styles.card}>
                <Card.Cover
                  style={{width: 'auto'}}
                  source={setPetImagePlaceHolder(pet.tipo_pet)}
                />
                <Card.Title title={pet.nome} />
                <Collapsible collapsed={isCollapsed}>
                  <Card.Content>
                    <Text variant="titleMedium">Tipo:</Text>
                    <Text variant="bodyLarge">{pet.tipo_pet}</Text>
                    <Text variant="titleMedium">Raça:</Text>
                    <Text variant="bodyLarge">{pet.raca}</Text>
                    <Text variant="titleMedium">Sexo:</Text>
                    <Text variant="bodyLarge">{pet.sexo}</Text>
                    <Text variant="titleMedium">Cor:</Text>
                    <Text variant="bodyLarge">{pet.cor}</Text>
                    <Text variant="titleMedium">Idade:</Text>
                    <Text variant="bodyLarge">
                      {getDiffIdade(pet.data_nascimento)}
                    </Text>
                    <Text variant="titleMedium">Data Nasc.:</Text>
                    <Text variant="bodyLarge">
                      {moment(
                        pet.data_nascimento.split(' ')[0],
                        'YYYY-MM-DD',
                      ).format('DD/MM/YYYY')}
                    </Text>

                    {/*  <Text variant="bodyLarge">
                      Tipo Sanguíneo: {pet.infoMedica?.tipoSanguineo}
                    </Text>
                    <Text variant="bodyLarge">
                      Alergias: {pet.infoMedica?.alergias}
                    </Text> */}
                    <View style={{marginTop: 20, marginBottom: 10}}>
                      <Button
                        icon="pencil"
                        mode="text"
                        onPress={() => showEditModal(pet.id)}>
                        Editar
                      </Button>
                      <Button
                        icon="close-circle-outline"
                        mode="text"
                        style={styles.buttonRemover}
                        onPress={() => showConfirmModal(pet.id)}>
                        Remover
                      </Button>
                    </View>
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
              <Text>Nenhum Pet Cadastrado</Text>
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
              name={'tipo_pet'}
              options={tiposAnimais}
              label={'Tipo de Pet'}
              onValueChange={handleTipoPetChange}
            />
            {tipoPet === 'Cachorro' ? (
              <ControlSelectInput
                control={control}
                name={'raca'}
                options={optionsRacasCachorro}
                label={'Raça de Cachorro'}
              />
            ) : tipoPet === 'Gato' ? (
              <ControlSelectInput
                control={control}
                name={'raca'}
                options={optionsRacasGato}
                label={'Raça de Gato'}
              />
            ) : (
              <ControlTextInput
                name={'raca'}
                label={'Raça'}
                mode={'outlined'}
                control={control}
                rules={{required: 'Raça de pet Obrigatório'}}
                style={styles.input}
                secureTextEntry={false}
              />
            )}

            <ControlTextInput
              name={'cor'}
              label={'Cor'}
              mode={'outlined'}
              control={control}
              rules={{required: 'Cor de pet Obrigatório'}}
              style={styles.input}
              secureTextEntry={false}
            />
            <ControlDateInput
              control={control}
              rules={{required: 'Data de Nascimento Obrigatória'}}
              label={'Data de Nasc.'}
              name={'data_nascimento'}
              mode={'outlined'}
            />

            <ControlSelectInput
              control={control}
              name={'sexo'}
              options={sexoAnimais}
              label={'Sexo de Pet'}
              style={{borderWidth: 2, borderColor: 'black'}}
            />
            <View style={styles.divButtons}>
              <Button
                icon="plus"
                mode="outlined"
                style={styles.button}
                onPress={handleSubmit(registerPet)}>
                Registrar Item
              </Button>
            </View>
          </CustomModal>

          <CustomModal
            visible={visibleEditModal}
            onDismiss={hideEditModal}
            containerStyle={styles.containerStyle}>
            <Text
              variant="titleMedium"
              style={[styles.textCenter, {marginBottom: 10}]}>
              Alterar Pet
            </Text>
            <ControlTextInput
              name={'nome'}
              label={'Nome'}
              mode={'outlined'}
              control={control}
              style={styles.input}
              secureTextEntry={false}
            />

            <ControlSelectInput
              control={control}
              name={'tipo_pet'}
              options={tiposAnimais}
              label={'Tipo de Pet'}
              onValueChange={handleTipoPetChange}
            />

            <ControlTextInput
              name={'raca'}
              label={'Raça'}
              mode={'outlined'}
              control={control}
              style={styles.input}
              secureTextEntry={false}
            />
            <ControlDateInput
              control={control}
              label={'Data de Nasc.'}
              name={'data_nascimento'}
              mode={'outlined'}
            />

            <ControlSelectInput
              control={control}
              name={'sexo'}
              options={sexoAnimais}
              label={'Sexo de Pet'}
            />

            <ControlTextInput
              name={'cor'}
              label={'Cor'}
              mode={'outlined'}
              control={control}
              style={styles.input}
            />

            <View style={styles.divButtons}>
              <Button
                icon="plus"
                mode="outlined"
                style={styles.button}
                onPress={handleSubmit(editPet)}>
                Enviar
              </Button>
            </View>
          </CustomModal>

          <CustomModal
            visible={visibleConfirmModal}
            onDismiss={hideConfirmModal}
            containerStyle={styles.containerConfirmStyle}>
            <Text
              variant="titleMedium"
              style={[styles.textCenter, {marginBottom: 10}]}>
              Tem certeza que quer remover este Pet?
            </Text>
            <View style={styles.divButtons}>
              <Button mode="outlined" style={styles.button} onPress={deletePet}>
                Sim
              </Button>
              <Button
                mode="outlined"
                style={styles.button}
                onPress={hideConfirmModal}>
                Não
              </Button>
            </View>
          </CustomModal>
        </View>
      </ScrollView>
      <CustomFabButton
        visible={true}
        style={styles.fabStyle}
        isExtended={isExtended}
        onPress={showModal}
        label={'Add Pet'}
        animateFrom={'right'}
      />
      {isLoading ? <LoadingOverlay /> : <Text children={undefined} />}
      <Text style={{color: 'red', textAlign: 'center'}}>{}</Text>
      <Toast />
    </View>
  );
};

export default ProfilePetsScreen;

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
    right: 30,
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
  containerConfirmStyle: {
    backgroundColor: 'white',
    gap: 5,
    width: '80%',
    borderRadius: 5,
    height: 200,
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
  buttonRemover: {
    color: '#e03a10',
  },
  input: {
    width: '100%',
    height: 50,
  },
});
