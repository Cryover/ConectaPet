/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Button, DataTable, FAB, Text} from 'react-native-paper';
import Calendario from '../../components/molecules/Calendario/Calendario';
import CustomModal from '../../components/Modal/CustomModal';
import {useForm} from 'react-hook-form';
import {Despesa, HistoricoScreenNavigationProp, Pet} from '../../types/types';
import moment from 'moment';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import axiosInstance from '../../utils/axiosIstance';
import {useAuthContext} from '../../contexts/authContext';
import ControlDateInput from '../../components/atoms/inputs/ControlDateInput';
import Toast from 'react-native-toast-message';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import {useLoading} from '../../contexts/loadingContext';
import {useToast} from '../../contexts/toastContext';
import ControlSelectMultipleInput from '../../components/atoms/inputs/ControlSelectMultipleInput';
import ControlAutoCompleteInput from '../../components/atoms/inputs/ControlAutoCompleteInput';

const HistoricoScreen: React.FC<{
  navigation: HistoricoScreenNavigationProp;
}> = ({navigation}) => {
  const {user, userToken, setUserToken} = useAuthContext();
  const {startLoading, stopLoading, isLoading} = useLoading();
  const {showToast} = useToast();
  const [refreshing, setRefreshing] = React.useState(false);
  let [pets, setPets] = useState<Pet[]>([]);
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 20]);
  const [despesasPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const [despesas, setDespesas] = useState<any[]>([]);
  const [state, setState] = useState({open: false});
  const from = page * despesasPerPage;
  const to = Math.min((page + 1) * despesasPerPage, despesas.length);
  const {control, handleSubmit} = useForm();
  const [currentMonth, setCurrentMonth] = useState<number | string>(
    new Date().getMonth() + 1,
  );
  const [dateFromCalendar, setDateFromCalendar] = useState<Date>();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [despesaSelected, setDespesaSelected] = useState<string>();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const showConfirmModal = (petId: string) => {
    setDespesaSelected(petId);
    setVisibleConfirmModal(true);
  };
  const hideConfirmModal = () => setVisibleConfirmModal(false);

  const showEditModal = (petId: string) => {
    setDespesaSelected(petId);
    setVisibleEditModal(true);
  };
  const hideEditModal = () => setVisibleEditModal(false);

  const getDespesasByMonth = async () => {
    try {
      startLoading();
      await axiosInstance
        .get(`/despesa/byowner/${user?.id}/mes/${currentMonth}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          console.log(response.status);

          const formatedDespesa: Despesa[] = response.data;
          console.log('formatedDespesa', formatedDespesa);
          console.log('response.data', response.data);
          showToast(
            'success',
            `Encontrado ${formatedDespesa.length} com sucesso!`,
          );
          setDespesas(formatedDespesa);
          console.log(despesas);
          if (response.status === 401) {
            showToast('error', 'Token Expirado, favor fazer login novamente');
            setUserToken(null);
            navigation.navigate('Login');
          }
          console.log('Response', response.status);
        })
        .catch(err => {
          showToast('error', `${err}`);
          if (err.status === 401) {
            showToast('error', 'Token Expirado, favor fazer login novamente');
            setUserToken(null);
            navigation.navigate('Login');
          }
        });
    } catch (err) {
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  const getPetsByOwner = async () => {
    try {
      startLoading();

      const response = await axiosInstance.get(`/pets?id=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        const formatedPets: Pet[] = response.data;
        console.log('formatedPets', response.data);

        setPets(formatedPets);
      } else if (response.status === 401) {
        setUserToken(null);
        navigation.navigate('Login');
      }
    } catch (err) {
      showToast('error', `Erro ${err} ao buscar pets de dono.`);
    } finally {
      stopLoading();
    }
  };

  const handleDayPressed = (data: string) => {
    showModal();
    console.log('DataString: ', data);
    console.log('DataString new Date: ', new Date(data));
    setDateFromCalendar(new Date(data));
  };

  const handleMonthChange = (data: string) => {
    console.log('DataString Month: ', data);
    const splitedMonth = data.split('-')[1];
    //const monthNumber = parseInt(splitedMonth, 10);
    let stringWithoutSpaces = splitedMonth.replace(/\s/g, '');
    console.log('monthNumber: ', stringWithoutSpaces);
    setCurrentMonth(stringWithoutSpaces);
    getDespesasByMonth();
  };

  const registerDespesa = async (formData: any) => {
    try {
      startLoading();

      const response = await axiosInstance.post(
        `/despesa?id=${user?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (response.status === 200) {
        console.log('formatedPets', response.data);

        setDespesas(response.data);
        showToast('sucess', 'Despesa Cadastrada com sucesso.');
      } else if (response.status === 401) {
        setUserToken(null);
        showToast('error', 'Token expirado favor fazer login novamente.');
        navigation.navigate('Login');
      }
    } catch (err) {
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  const deleteDespesa = async () => {
    try {
      startLoading();

      const response = await axiosInstance.delete(`/despesa?id=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        console.log('formatedPets', response.data);
        showToast('sucess', 'Despesa Deletada com sucesso.');
        setDespesas(response.data);
      } else if (response.status === 401) {
        showToast('error', 'Token expirado favor fazer login novamente.');
        setUserToken(null);
        navigation.navigate('Login');
      }
    } catch (err) {
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  const editDespesa = async () => {
    try {
      startLoading();

      const response = await axiosInstance.patch(`/despesa?id=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        console.log('formatedDespesas', response.data);
        showToast('sucess', 'Despesa Alterada com sucesso.');
        setDespesas(response.data);
      } else if (response.status === 401) {
        showToast('error', 'Token expirado favor fazer login novamente.');
        setUserToken(null);
        navigation.navigate('Login');
      }
    } catch (err) {
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  const onRefresh = React.useCallback(() => {
    getDespesasByMonth();
  }, []);

  useEffect(() => {
    setPage(0);
    getDespesasByMonth();
    getPetsByOwner();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps={'always'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text variant="titleMedium" style={{marginBottom: 20}}>
          Historico de Despesas
        </Text>
        <Calendario
          onDayPress={handleDayPressed}
          onMonthChange={handleMonthChange}
        />
        <Text>Teste</Text>

        {despesas && despesas?.length > 0 ? (
          <DataTable style={{marginBottom: 0}}>
            <DataTable.Header>
              <DataTable.Title style={{flex: 3}}>Nome do Item</DataTable.Title>
              <DataTable.Title style={{flex: 1}}>Valor</DataTable.Title>
              <DataTable.Title style={{flex: 1}}>Data</DataTable.Title>
              <DataTable.Title style={{flex: 1}}>Comandos</DataTable.Title>
            </DataTable.Header>

            {despesas?.map(despesa => (
              <DataTable.Row key={despesa.id}>
                <Text numberOfLines={3} style={{flex: 2}}>
                  {despesa.nome}
                </Text>
                <DataTable.Cell style={{flex: 1}} numeric>
                  R$ {despesa.valor}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}}>
                  {moment(despesa.data.split(' ')[0], 'YYYY-MM-DD').format(
                    'DD/MM/YYYY',
                  )}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}}>
                  <View style={{marginTop: 20, marginBottom: 10}}>
                    <Button
                      icon="pencil"
                      mode="text"
                      onPress={() => showEditModal(despesa.id)}>
                      Editar
                    </Button>
                    <Button
                      icon="close-circle-outline"
                      mode="text"
                      style={styles.buttonRemover as ViewStyle}
                      onPress={() => showConfirmModal(despesa.id)}>
                      Remover
                    </Button>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(despesas.length / despesasPerPage)}
              onPageChange={page => setPage(page)}
              label={`Pag. ${from + 1} de ${to} de ${despesas.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={despesasPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Itens por Pagina'}
            />
          </DataTable>
        ) : (
          <View style={styles.notFound}>
            <Image
              style={styles.sadDoge}
              source={require('../../assets/images/sadDoge.webp')}
            />
            <Text>{'Nenhuma despesa cadastrada neste mês'}</Text>
          </View>
        )}
        <FAB icon="plus" style={styles.fab} onPress={showModal} />

        {isLoading ? <LoadingOverlay /> : <Text children={undefined} />}
        <Text style={{color: 'red', textAlign: 'center'}}>{}</Text>
        <Toast />
      </ScrollView>

      <CustomModal
        visible={visibleModal}
        onDismiss={hideModal}
        containerStyle={styles.containerStyle}>
        <Text
          variant="titleMedium"
          style={[styles.textCenter, {marginBottom: 10}]}>
          Cadastro de Despesa
        </Text>
        <ControlTextInput
          name={'nome'}
          label={'Nome'}
          mode={'outlined'}
          multiline={true}
          numberOfLines={4}
          control={control}
          rules={{required: 'Nome de despesa Obrigatório'}}
          style={styles.input}
        />
        {/* <ControlSelectMultipleInput
          control={control}
          name={'ids_pets'}
          label={''}
          options={pets}
          placeHolder={''}
          optionLabel={pets.}
          optionValue={pets[0].id}
          primaryColor={''}
        /> */}

        <ControlAutoCompleteInput
          control={control}
          name={''}
          label={''}
          options={[]}
        />

        <ControlDateInput
          control={control}
          label={'Data'}
          name={'data'}
          mode={'outlined'}
          rules={{required: 'Data de despesa Obrigatório'}}
          initialValue={dateFromCalendar ? dateFromCalendar : undefined}
        />
        <ControlTextInput
          name={'valor'}
          label={'Valor'}
          mode={'outlined'}
          control={control}
          rules={{required: 'Valor de despesa Obrigatório'}}
          style={styles.input}
        />
        <ControlTextInput
          name={'observacao'}
          label={'Observação (Opcional)'}
          mode={'outlined'}
          control={control}
          style={styles.input}
          multiline={true}
          numberOfLines={4}
        />

        <Button
          icon="plus"
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(registerDespesa)}>
          Registrar Despesa
        </Button>
      </CustomModal>
    </>
  );
};

export default HistoricoScreen;

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  input: {
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    textColor: 'white',
    backgroundColor: '#5D6BB0',
  },
  containerStyle: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    width: '80%',
    borderRadius: 5,
    height: 'auto',
    alignSelf: 'center',
    padding: 15,
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
  buttonRemover: {
    color: '#e03a10',
  },
});
