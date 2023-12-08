/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, FAB, Text} from 'react-native-paper';
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
import {useToast} from '../../contexts/toastContext';
import AgendaComponent from '../../components/molecules/Agenda/Agenda';

const AgendaScreen: React.FC<{navigation: AgendaScreenNavigationProp}> = ({
  navigation,
}) => {
  const {control, handleSubmit} = useForm();
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [dateFromCalendar, setDateFromCalendar] = useState<Date>();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [visibleTimeModal, setVisibleTimeModal] = useState(false);
  const {user, userToken, setUser, setUserToken} = useAuthContext();
  const {startLoading, stopLoading, isLoading} = useLoading();
  const {showToast} = useToast();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const showConfirmModal = () => setVisibleConfirmModal(true);
  const hideConfirmModal = () => setVisibleConfirmModal(false);

  const showTimeModal = () => setVisibleTimeModal(true);
  const hideTimeModal = () => setVisibleTimeModal(false);

  const getCompromissosByMonth = async () => {
    //console.log('currentMonth', currentMonth);
    const currentMonth = 0;

    try {
      startLoading();
      await axiosInstance
        .get(`/compromisso/byowner/${user?.id}/mes/${currentMonth}`, {
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
    } finally {
      stopLoading();
    }
  };

  const getCompromissosByDay = async (date: string) => {
    console.log('currentMonth', date);
    const momentDate = moment(date);
    const day = momentDate.format('D');
    console.log('Day', day);
    try {
      startLoading();
      await axiosInstance
        .get(`/compromisso/byowner/${user?.id}/dia/${day}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          const formatedCompromisso: Compromisso[] = response.data;
          console.log(formatedCompromisso);
          if (response.status === 200) {
            setCompromissos(formatedCompromisso);
          } else if (response.status === 401) {
            setUserToken(null);
            navigation.navigate('Login');
          }
        })
        .catch(err => {
          console.log(err);
          if (err.status === 401) {
            navigation.navigate('Login');
          }
        });
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  const handleDayPressed = (data: string) => {
    showModal();
    console.log('DataString: ', data);
    console.log('DataString new Date: ', new Date(data));
    //setDateFromCalendar(new Date(data));
    getCompromissosByDay(data);
  };

  const handleMonthChange = (data: string) => {
    console.log('DataString Month: ', data);
    const splitedMonth = data.split('-')[1];
    const monthNumber = parseInt(splitedMonth, 10);
    console.log('monthNumber: ', monthNumber);
    getCompromissosByMonth();
  };

  const registerCompromisso = async (formData: any) => {
    console.log('Teste');
    console.log(formData);
    try {
      startLoading();
      console.log('formData', formData);

      const response = await axiosInstance.post(
        `/compromisso?id=${user?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (response.status === 200) {
        hideModal();
        getCompromissosByMonth();
      } else if (response.status === 401) {
      }

      console.log('compromisso response', response);
    } catch (err) {
      hideModal();
      console.error(err);
      showToast('error', `${err}`);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    //getCompromissosByMonth();
  }, []);

  return (
    <>
      <AgendaComponent />

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
          mode={'outlined'}
          rules={{required: 'Título de compromisso é Obrigatório'}}
          style={styles.input}
          secureTextEntry={false}
        />
        <ControlDateInput
          control={control}
          label={'Data'}
          name={'data'}
          mode={'outlined'}
          style={styles.input}
          initialValue={dateFromCalendar ? dateFromCalendar : undefined}
        />

        {/* <Button onPress={showTimeModal} uppercase={false} mode="outlined">
          Definir Hora
        </Button>

        <CustomTimeModal
          onDismiss={hideTimeModal}
          onConfirm={hideTimeModal}
          name={'hora'}
          label={'Hora'}
          control={control}
          visible={true}
        /> */}

        <ControlTextInput
          name={'descricao'}
          label={'Descrição'}
          mode={'outlined'}
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

      <FAB icon="plus" style={styles.fab} onPress={showModal} />
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
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    textColor: 'white',
    backgroundColor: '#5D6BB0',
  },
});
