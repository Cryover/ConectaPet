/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';
import Calendario from '../../components/molecules/Calendario/Calendario';
import CustomFabButton from '../../components/Buttons/CustomFabButton';
import CustomModal from '../../components/Modal/CustomModal';
import {useForm} from 'react-hook-form';
import {Despesa, HistoricoScreenNavigationProp} from '../../types/types';
import moment from 'moment';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import axiosInstance from '../../utils/axiosIstance';
import {useAuthContext} from '../../contexts/authContext';

const HistoricoScreen: React.FC<{
  navigation: HistoricoScreenNavigationProp;
}> = ({navigation}) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 20]);
  const [despesasPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  const from = page * despesasPerPage;
  const to = Math.min((page + 1) * despesasPerPage, despesas.length);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);
  const {control, handleSubmit} = useForm();
  const {user, userToken} = useAuthContext();
  const [error, setError] = useState<string>();

  const onScroll = ({nativeEvent}: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const getDespesas = async () => {
    try {
      await axiosInstance
        .get(`/compromisso/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(response => {
          const formatedDespesa: Despesa[] = response.data;
          console.log(formatedDespesa);
          setDespesas(formatedDespesa);
        })
        .catch(err => {
          console.log('error historico', error);
          if (err.status === 401) {
            navigation.navigate('Login');
          } else {
            setError('Nenhuma despesa cadastrada.');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const registerDespesa = async () => {};

  useEffect(() => {
    setPage(0);
    getDespesas();
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollView} onScroll={onScroll}>
        <Text variant="titleMedium" style={{marginBottom: 20}}>
          Historico de Despesas
        </Text>
        <Calendario />
        {despesas.length > 0 ? (
          <DataTable style={{marginBottom: 70}}>
            <DataTable.Header>
              <DataTable.Title style={{flex: 3}}>Nome do Item</DataTable.Title>
              <DataTable.Title style={{flex: 1}}>Valor</DataTable.Title>
              <DataTable.Title style={{flex: 1}}>Data</DataTable.Title>
            </DataTable.Header>

            {despesas.slice(from, to).map(despesa => (
              <DataTable.Row key={despesa.id}>
                <Text numberOfLines={3} style={{flex: 2}}>
                  {despesa.nome}
                </Text>
                <DataTable.Cell style={{flex: 1}} numeric>
                  R$ {despesa.valor}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}}>
                  {moment(despesa.dataDespesa).format('DD/MM/YYYY')}
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
            <Text>{error}</Text>
            <Button
              icon="plus"
              mode="contained"
              style={styles.button}
              onPress={showModal}>
              Cadastrar Despesa
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
            Cadastro de Despesa
          </Text>
          <ControlTextInput
            name={'nome'}
            label={'Nome'}
            multiline={true}
            numberOfLines={4}
            control={control}
            rules={{required: 'Nome de despesa Obrigatório'}}
            style={styles.input}
            secureTextEntry={false}
          />
          <ControlTextInput
            name={'valor'}
            label={'Valor'}
            control={control}
            rules={{required: 'Nome do despesa Obrigatório'}}
            style={styles.input}
            secureTextEntry={false}
          />
          <Button
            icon="plus"
            mode="contained"
            style={styles.button}
            onPress={handleSubmit(registerDespesa)}>
            Registrar Despesa
          </Button>
        </CustomModal>
        <CustomFabButton
          visible={true}
          style={styles.fabStyle}
          isExtended={isExtended}
          onPress={showModal}
          label={'Add Despesa'}
          animateFrom={'left'}
        />
      </ScrollView>
    </View>
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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    textColor: 'white',
    backgroundColor: '#5D6BB0',
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
