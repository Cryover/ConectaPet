/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';
import Calendario from '../../components/molecules/Calendario/Calendario';
import CustomFabButton from '../../components/Buttons/CustomFabButton';
import CustomModal from '../../components/Modal/CustomModal';
import {useForm} from 'react-hook-form';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import moment from 'moment';
import {useAuthContext} from '../../contexts/authContext';
import {AgendaScreenNavigationProp, Compromisso} from '../../types/types';
import ControlDateInput from '../../components/atoms/inputs/ControlDateInput';
import axiosInstance from '../../utils/axiosIstance';
import Toast from 'react-native-toast-message';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import {useLoading} from '../../contexts/loadingContext';
//import Toast from 'react-native-toast-message';

const AgendaScreen: React.FC<{navigation: AgendaScreenNavigationProp}> = ({
  navigation,
}) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 24]);
  const [compromissosPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const {control, handleSubmit} = useForm();
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [dateFromCalendar, setDateFromCalendar] = useState<Date>();

  const from = page * compromissosPerPage;
  const to = Math.min((page + 1) * compromissosPerPage, compromissos.length);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const {user, userToken} = useAuthContext();
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const {startLoading, stopLoading, isLoading} = useLoading();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const onScroll = ({nativeEvent}: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  /* const getAllCompromissos = async () => {
    try {
      await axiosInstance
        .get(`/compromisso/byowner/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          const formatedCompromisso: Compromisso[] = response.data;
          console.log(formatedCompromisso);
          setCompromissos(formatedCompromisso);
        })
        .catch(err => {
          console.log(err);
          if (err.status === 401) {
            navigation.navigate('Login');
          } else {
            setError('Nenhum compromisso cadastrado.');
          }
        });
    } catch (err) {
      console.log(err);
    }
  }; */

  const getCompromissosByMonth = async () => {
    console.log('currentMonth', currentMonth);

    try {
      await axiosInstance
        .get(`/compromisso/byowner/${user?.id}/mes?month=${currentMonth}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          const formatedCompromisso: Compromisso[] = response.data;
          console.log(formatedCompromisso);
          setCompromissos(formatedCompromisso);
        })
        .catch(err => {
          console.log(err);
          if (err.status === 401) {
            navigation.navigate('Login');
          }
        });
    } catch (err) {
      console.log(err);
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
    const monthNumber = parseInt(splitedMonth, 10);
    console.log('monthNumber: ', monthNumber);
    setCurrentMonth(monthNumber);
    getCompromissosByMonth();
  };

  const registerCompromisso = async (formData: any) => {
    console.log('Teste');
    console.log(formData);
    try {
      console.log('formData', formData);
      //console.log('user', user);
      //console.log('userToken', userToken);
      //console.log('user', user?.id);

      const response = await axiosInstance.post(
        `/compromisso?id=${user?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      console.log('compromisso response', response);

      hideModal();
      getCompromissosByMonth();
    } catch (err) {
      hideModal();
      console.error(err);
    }
  };

  useEffect(() => {
    setPage(0);
    //getCompromissos();
    //console.log(new Date().getMonth);
    getCompromissosByMonth();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView} onScroll={onScroll}>
        <Text variant="titleMedium" style={{marginBottom: 20}}>
          Agenda de compromissos
        </Text>
        <Calendario
          onDayPress={handleDayPressed}
          onMonthChange={handleMonthChange}
        />

        <Button
          mode="contained"
          style={styles.button}
          onPress={getCompromissosByMonth}>
          Resetar Lista
        </Button>

        {compromissos.length > 0 ? (
          <DataTable style={{marginBottom: 70}}>
            <DataTable.Header>
              <DataTable.Title style={{flex: 4}}>Título</DataTable.Title>
              <DataTable.Title style={{flex: 2}}>Data</DataTable.Title>
              <DataTable.Title style={{flex: 2}}>Descri.</DataTable.Title>
            </DataTable.Header>

            {compromissos.slice(from, to).map(compromisso => (
              <DataTable.Row key={compromisso.id}>
                <Text numberOfLines={3} style={{flex: 3}}>
                  {compromisso.titulo}
                </Text>
                <DataTable.Cell style={{flex: 2}}>
                  {moment(compromisso.data).format('DD/MM/YYYY')}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 2}}>
                  {compromisso.descricao}
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(
                compromissos.length / compromissosPerPage,
              )}
              onPageChange={page => setPage(page)}
              label={`Pag. ${from + 1} de ${to} de ${compromissos.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={compromissosPerPage}
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
            <Text>Nenhum compromisso cadastrado</Text>
          </View>
        )}
      </ScrollView>

      <CustomModal
        visible={visibleModal}
        onDismiss={hideModal}
        containerStyle={styles.containerStyle}>
        <Text
          variant="titleMedium"
          style={[styles.textCenter, {marginBottom: 10}]}>
          Cadastro de Compromisso
        </Text>
        <ControlTextInput
          name={'nome'}
          label={'Nome'}
          control={control}
          rules={{required: 'Título de compromisso é Obrigatório'}}
          style={styles.input}
          secureTextEntry={false}
        />
        <ControlDateInput
          control={control}
          label={'Data'}
          name={'data'}
          mode={'outlined'}
          initialValue={dateFromCalendar ? dateFromCalendar : undefined}
        />
        {/* <ControlTextInput
          name={'ids_pets'}
          label={'Nome'}
          control={control}
          rules={{required: 'Título de compromisso é Obrigatório'}}
          style={styles.input}
          secureTextEntry={false}
        /> */}
        <ControlTextInput
          name={'descricao'}
          label={'Descrição'}
          multiline={true}
          numberOfLines={4}
          control={control}
          rules={{required: 'Descrição é Obrigatório'}}
          style={styles.input}
          secureTextEntry={false}
        />
        <Button
          icon="plus"
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(registerCompromisso)}>
          Registrar Compromisso
        </Button>
      </CustomModal>

      <CustomFabButton
        visible={true}
        style={styles.fabStyle}
        isExtended={isExtended}
        onPress={showModal}
        label={'Add Compromisso'}
        animateFrom={'left'}
      />
      {isLoading ? <LoadingOverlay /> : <Text children={undefined} />}
      <Text style={{color: 'red', textAlign: 'center'}}>{}</Text>
      <Toast />
    </>
  );
};

export default AgendaScreen;

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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: '#5D6BB0',
  },
  containerStyle: {
    backgroundColor: 'white',
    gap: 10,
    width: '80%',
    height: 400,
    alignSelf: 'center',
    padding: 20,
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
});
