/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';
import Calendario from '../../components/molecules/Calendario/Calendario';
import CustomFabButton from '../../components/Buttons/CustomFabButton';
import CustomModal from '../../components/Modal/CustomModal';
import ControlTextInput from '../../components/atoms/controller/ControlTextInput';
import {useForm} from 'react-hook-form';

type Item = {
  id: string;
  nome: string;
  valor: number;
  dataDespesa: Date;
};

const AgendaScreen = () => {
  const [page, setPage] = useState<number>(0);
  const [nomePet, setNomePet] = useState<string>('Rabada');
  const [numberOfItemsPerPageList] = useState([5, 10, 24]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const {control, handleSubmit} = useForm();

  const [items] = useState<Item[]>([
    {
      id: '1',
      nome: 'Ração Premier Pet Formula Cães Adultos Raças Pequenas 2,5KG',
      valor: 71.91,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '2',
      nome: 'Shampoo Antipulgas Sanol Dog para Cães',
      valor: 60.92,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '3',
      nome: 'Ossinho para Cães Smartbones Sweet Potato Medium',
      valor: 33.54,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '4',
      nome: 'Tapete Higiênico MyHug para Cães Adultos e Filhotes',
      valor: 99.9,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '5',
      nome: 'Antipulgas Simparic 10 a 20kg Cães 40mg',
      valor: 119.9,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '6',
      nome: 'Ração GranPlus Gourmet Gatos Adultos Castrados',
      valor: 28.62,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '7',
      nome: 'Areia para Gato Katbom Natural Granulado Higiênico',
      valor: 45.5,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '8',
      nome: 'Areia Higiênica Biodegradável Vida Descomplicada Viva Verde',
      valor: 59.4,
      dataDespesa: new Date('12/10/2023'),
    },
    {
      id: '9',
      nome: 'Antipulgas Simparic 5 a 10kg Cães 20mg',
      valor: 100.5,
      dataDespesa: new Date('12/10/2023'),
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isExtended, setIsExtended] = useState(true);

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const onScroll = ({nativeEvent}: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView} onScroll={onScroll}>
        <Text variant="titleMedium" style={{marginBottom: 20}}>
          Historico de Despesas
        </Text>
        <Calendario />

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
            label={'Título'}
            control={control}
            rules={{required: 'Título de compromisso é Obrigatório'}}
            style={styles.input}
            secureTextEntry={false}
          />
          <ControlTextInput
            name={'descricao'}
            label={'Descrição'}
            control={control}
            rules={{required: 'Descrição é Obrigatório'}}
            style={styles.input}
            secureTextEntry={false}
          />
          <Button
            icon="plus"
            mode="contained"
            style={styles.button}
            //onPress={handleSubmit(onLoginPressed)}
          >
            Registrar Item
          </Button>
          <Button
            icon="cancel"
            mode="contained"
            style={styles.button}
            onPress={hideModal}>
            Cancelar
          </Button>
        </CustomModal>

        <DataTable style={{marginBottom: 70}}>
          <DataTable.Header>
            <DataTable.Title style={{flex: 4}}>Nome do Item</DataTable.Title>
            <DataTable.Title style={{flex: 2}} numeric>
              Valor
            </DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map(item => (
            <DataTable.Row key={item.id}>
              <Text numberOfLines={3} style={{flex: 3}}>
                {item.nome}
              </Text>
              <DataTable.Cell style={{flex: 2}} numeric>
                R$ {item.valor}
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`Pag. ${from + 1} de ${to} de ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Itens por Pagina'}
          />
        </DataTable>
      </ScrollView>

      <CustomFabButton
        visible={true}
        style={styles.fabStyle}
        isExtended={isExtended}
        onPress={showModal}
        label={'Add Despesa'}
        animateFrom={'left'}
      />
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
});
