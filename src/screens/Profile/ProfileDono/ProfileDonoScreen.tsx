/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, FAB, Text} from 'react-native-paper';
import {useAuthContext} from '../../../contexts/authContext';
import {useToast} from '../../../contexts/toastContext';
import CustomModal from '../../../components/Modal/CustomModal';
import {useLoading} from '../../../contexts/loadingContext';
import axiosInstance from '../../../utils/axiosIstance';
import {ProfileDonoScreenNavigationProp} from '../../../types/types';
import ControlTextInput from '../../../components/atoms/inputs/ControlTextInput';
import {useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import LoadingOverlay from '../../../components/atoms/LoadingOverlay';
import moment from 'moment';

export const ProfileDonoScreen: React.FC<{
  navigation: ProfileDonoScreenNavigationProp;
}> = ({navigation}) => {
  const {user, userToken, setUser, setUserToken} = useAuthContext();
  const {startLoading, stopLoading, isLoading} = useLoading();
  const {showToast} = useToast();
  const [petSelected, setUserSelected] = useState<string>();
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [visibleUserEditModal, setVisibleUserEditModal] = useState(false);
  const {control, handleSubmit, getValues} = useForm();

  const showConfirmModal = (userId: string) => {
    setUserSelected(userId);
    setVisibleConfirmModal(true);
  };
  const hideConfirmModal = () => setVisibleConfirmModal(false);
  const showUserEditModal = () => setVisibleUserEditModal(true);
  const hideUserEditModal = () => setVisibleUserEditModal(false);

  const deleteUser = async () => {
    try {
      startLoading();

      const response = await axiosInstance.delete(
        `/usuarios?id=${petSelected}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (response.status === 200) {
        hideConfirmModal();
        showToast(
          'success',
          'Usuario deletado com sucesso, obrigado por utilizado a plataforma!',
        );
        setUserToken(null);
      } else if (response.status === 401) {
        showToast('error', 'Token Expirado, favor facer Login novamente');
        setUserToken(null);
      }
    } catch (err) {
      showToast('error', 'Erro ao deletar usuario.');
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  const editUsuario = async (dataFields: any) => {
    try {
      startLoading();
      //console.log('userEdit fields', dataFields);
      await axiosInstance
        .patch(`/usuarios/?id=${user?.id}`, dataFields, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          if (response.status === 200) {
            getUserById();
            showToast('success', 'Usuario atualizado com sucesso!');
            hideUserEditModal();
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

  const getUserById = async () => {
    try {
      console.log('Pesquisando user por id');
      await axiosInstance
        .get(`/usuarios/?id=${user?.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          if (response.status === 200) {
            setUser(response.data);
          } else if (response.status === 401) {
            setUserToken(null);
          }
        })
        .catch(err => {
          console.log(err);
          showToast('error', `Erro ao buscar usuario atualizado - ${err}`);
        });
    } catch (err) {
      showToast('error', `Erro ao buscar usuario atualizado - ${err}`);
      console.log(err);
    }
  };

  const firstLetterUppercase = (name: string | undefined) => {
    let formattedName;

    if (name) {
      formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    }

    return formattedName;
  };

  return (
    <View style={styles.cardContainer}>
      <Card key={user?.id} style={styles.card}>
        <Card.Cover
          style={{width: 'auto', height: 250}}
          source={require('../../../assets/images/default_profile_avatar.webp')}
        />
        <Card.Title
          title={
            user?.nome
              ? firstLetterUppercase(user?.nome)
              : 'Nome não cadastrado'
          }
        />
        <Card.Content>
          <Text variant="titleMedium">Nome de Usuário:</Text>
          <Text variant="bodyLarge">{user?.username}</Text>
          <Text variant="titleMedium">Email:</Text>
          <Text variant="bodyLarge">{user?.email}</Text>
          <Text variant="titleMedium">Tipo de Conta:</Text>
          <Text variant="bodyLarge">
            {firstLetterUppercase(user?.tipo_usuario)}
          </Text>
          <Text variant="titleMedium">Registrado em:</Text>
          <Text variant="bodyLarge">
            {moment(user?.criado_em.split(' ')[0], 'YYYY-MM-DD').format(
              'DD/MM/YYYY',
            )}
          </Text>
          <View style={{marginTop: 20, marginBottom: 10}}>
            <Button icon="pencil" mode="text" onPress={showUserEditModal}>
              Editar
            </Button>
            <Button
              icon="close-circle-outline"
              mode="text"
              style={styles.buttonRemover}
              onPress={() => showConfirmModal(user ? user.id : '')}>
              Remover
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Toast />
      <CustomModal
        visible={visibleUserEditModal}
        onDismiss={hideUserEditModal}
        containerStyle={styles.containerStyle}>
        <Text
          variant="titleMedium"
          style={[styles.textCenter, {marginBottom: 10}]}>
          Atualização de Tutor
        </Text>
        <ControlTextInput
          name={'nome'}
          label={'Nome'}
          mode={'outlined'}
          control={control}
          style={styles.input}
          secureTextEntry={false}
        />

        <ControlTextInput
          control={control}
          name="password"
          mode={'outlined'}
          rules={{
            minLength: {
              value: 6,
              message: 'Mínimo de seis caracteres',
            },
          }}
          style={styles.input}
          secureTextEntry={false}
          label="Nova Senha"
        />

        <ControlTextInput
          name={'email'}
          label={'Email'}
          mode={'outlined'}
          control={control}
          rules={{
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Endereço de email inválido',
            },
          }}
          style={styles.input}
          secureTextEntry={false}
        />

        <View style={styles.divButtons}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSubmit(editUsuario)}>
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
          Tem certeza que quer deletar sua conta?
        </Text>
        <View style={styles.divButtons}>
          <Button mode="outlined" style={styles.button} onPress={deleteUser}>
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
      <FAB icon="refresh" style={styles.fab} onPress={() => getUserById()} />
      {isLoading ? <LoadingOverlay /> : <Text children={undefined} />}
      <Text style={{color: 'red', textAlign: 'center'}}>{}</Text>
      <Toast />
    </View>
  );
};

export default ProfileDonoScreen;

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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
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
    height: 350,
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
