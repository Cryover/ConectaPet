/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import {ScrollView} from 'react-native';
import {
  Avatar,
  Modal,
  Button,
  DataTable,
  Portal,
  Text,
} from 'react-native-paper';
import {styles} from './Styles';
import Calendario from '../../components/molecules/Calendario/Calendario';

const Historico = () => {
  const [page, setPage] = React.useState<number>(0);
  const [nomePet, setNomePet] = React.useState<string>('Rabada');
  const [numberOfItemsPerPageList] = React.useState([8, 16, 24]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const value = 22.9;

  const [items] = React.useState([
    {
      key: 1,
      name: 'Ração Premier Pet Formula Cães Adultos Raças Pequenas 2,5KG',
      gastos: 71.91,
      fat: 16,
    },
    {
      key: 2,
      name: 'Shampoo Antipulgas Sanol Dog para Cães',
      gastos: value.toFixed(2),
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      gastos: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 6,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 7,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 8,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 9,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 10,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 11,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 12,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
    {
      key: 13,
      name: 'Gingerbread',
      gastos: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Avatar.Image
        style={{marginTop: 20}}
        size={64}
        source={require('../../assets/images/avatar.webp')}
      />
      <Text variant="titleMedium">{nomePet}</Text>

      <Calendario />
      <Portal>
        <Modal
          style={{width: '80%', height: '80%', margin: 'auto'}}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>

      <Button style={{marginTop: 30}} onPress={showModal}>
        Adicionar
      </Button>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 4}}>Nome do Item</DataTable.Title>
          <DataTable.Title style={{flex: 2}} numeric>
            Valor
          </DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map(item => (
          <DataTable.Row key={item.key}>
            <Text numberOfLines={3} style={{flex: 3}}>
              {item.name}
            </Text>
            <DataTable.Cell style={{flex: 2}} numeric>
              R$ {item.gastos}
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
  );
};

export default Historico;
