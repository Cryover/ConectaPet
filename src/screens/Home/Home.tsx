/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  Appbar,
  Button,
  Avatar,
  IconButton,
  Text,
  Menu,
} from 'react-native-paper';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Dashboard from '../Dashboard/Dashboard';
import HistoricoScreen from '../Historico/Historico';
import Profile from '../Profile/ProfilePets/ProfilePets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../contexts/authContext';
import {
  RenderAgendaTabBarIcon,
  RenderDashboardTabBarIcon,
  RenderHistoricoTabBarIcon,
  RenderPerfilTabBarIcon,
} from '../../components/molecules/MaterialCommunityIcons/MaterialCommunityIcons';
import {HomeScreenNavigationProp, Pet} from '../../types/types';
import AgendaScreen from '../Agenda/AgendaScreen';
import CustomModal from '../../components/Modal/CustomModal';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import {useForm} from 'react-hook-form';
import navigationService from '../../services/navigationService';

const HomeScreen: React.FC<{navigation: HomeScreenNavigationProp}> = ({
  navigation,
}) => {
  const Tab = createMaterialBottomTabNavigator();
  const [visibleMenu, setVisibleMenu] = useState(true);
  const [visiblePetMenu, setVisiblePetMenu] = useState(true);
  const openOptionsMenu = () => setVisibleMenu(true);
  const closeOptionsMenu = () => setVisibleMenu(false);
  const openPetOptionsMenu = () => setVisiblePetMenu(true);
  const closePetOptionsMenu = () => setVisiblePetMenu(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const {logOut} = useAuthContext();
  const [chosenPet, setChosenPet] = useState<Pet>();
  const {control, handleSubmit} = useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const logout = async () => {
    try {
      closeOptionsMenu();
      logOut();
      console.info('user & userToken removidos com sucesso.');
      //navigation.navigate('Login');
    } catch (err) {
      console.error('Erro ao remover userToken:', err);
    }
  };

  const getChosenPet = async () => {
    try {
      const petInfo = await AsyncStorage.getItem('petInfo');

      if (petInfo) {
        const petInforFormated: Pet = JSON.parse(petInfo);
        setChosenPet(petInforFormated);
      }
    } catch (err) {
      console.error('Erro ao definir chosenPet:', err);
    }
  };

  useEffect(() => {
    getChosenPet();
  }, []);

  return (
    <>
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.Content title={chosenPet?.nome} />
        <Menu
          style={styles.menu}
          visible={visibleMenu}
          onDismiss={closeOptionsMenu}
          anchor={<IconButton icon={MORE_ICON} onPress={openOptionsMenu} />}>
          <Menu.Item title="Reportar Bug" onPress={showModal} />
          <Menu.Item title="Logout" onPress={logout} />
        </Menu>
        <Menu
          style={styles.petMenu}
          visible={visiblePetMenu}
          onDismiss={closePetOptionsMenu}
          anchor={
            <TouchableOpacity onPress={openPetOptionsMenu}>
              <Avatar.Image
                size={40}
                source={require('../../assets/images/avatar.webp')}
              />
            </TouchableOpacity>
          }>
          <Menu.Item title="Ver perfil de tutor" />
          <Menu.Item title="Trocar de pet" />
          <Menu.Item title="Definir como pet principal" />
        </Menu>
      </Appbar.Header>

      <Tab.Navigator
        initialRouteName="Dashboard"
        activeColor="#202020"
        inactiveColor="#202020"
        shifting={true}
        barStyle={{backgroundColor: '#5D6BB0'}}>
        <Tab.Screen
          name="Despesas"
          component={HistoricoScreen}
          options={{
            title: 'Despesas',
            tabBarLabel: 'Despesas',
            tabBarColor: '#EDBA54',
            tabBarIcon: RenderHistoricoTabBarIcon,
          }}
        />
        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{
            title: 'Agenda',
            tabBarLabel: 'Agenda',
            tabBarColor: '#EDBA54',
            tabBarIcon: RenderAgendaTabBarIcon,
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            tabBarLabel: 'Dasboard',
            tabBarColor: '#000000',
            tabBarIcon: RenderDashboardTabBarIcon,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Profile}
          options={{
            title: 'Pets',
            tabBarLabel: 'Pets',
            tabBarColor: '#EDBA54',
            tabBarIcon: RenderPerfilTabBarIcon,
          }}
        />
      </Tab.Navigator>
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
        <ControlTextInput
          name={'raca'}
          label={'Raça'}
          mode={'outlined'}
          control={control}
          rules={{required: 'Raça de pet Obrigatório'}}
          style={styles.input}
          secureTextEntry={false}
        />
        <View style={styles.divButtons}>
          <Button
            icon="plus"
            mode="outlined"
            style={styles.button}
            //onPress={handleSubmit(registerPet)}
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
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5d6bb088',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
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
  input: {
    //height: 40,
    width: 300,
  },
  divButtons: {
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  links: {
    marginTop: 20,
    color: 'white',
  },
  menu: {
    marginTop: 60,
    marginLeft: 40,
    backgroundColor: '#fffff',
  },
  petMenu: {
    marginTop: 60,
    marginLeft: 0,
    backgroundColor: '#fffff',
  },
  menu_item: {},
});
