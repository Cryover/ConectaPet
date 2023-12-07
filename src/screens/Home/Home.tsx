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
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Dashboard from '../Dashboard/Dashboard';
import HistoricoScreen from '../Historico/Historico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../contexts/authContext';
import {
  RenderAgendaTabBarIcon,
  RenderDashboardTabBarIcon,
  RenderHistoricoTabBarIcon,
  RenderPerfilTabBarIcon,
  RenderPerfilTutorTabBarIcon,
} from '../../components/molecules/MaterialCommunityIcons/MaterialCommunityIcons';
import {HomeScreenNavigationProp, Pet} from '../../types/types';
import AgendaScreen from '../Agenda/AgendaScreen';
import CustomModal from '../../components/Modal/CustomModal';
import ControlTextInput from '../../components/atoms/inputs/ControlTextInput';
import {useForm} from 'react-hook-form';
import ProfilePetsScreen from '../Profile/ProfilePets/ProfilePets';
import {useToast} from '../../contexts/toastContext';
import ProfileDonoScreen from '../Profile/ProfileDono/ProfileDonoScreen';
import navigationService from '../../services/navigationService';
import DashboardScreen from '../Dashboard/Dashboard';

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
  const {user, userToken, setUserToken} = useAuthContext();
  const {showToast} = useToast();

  const logout = async () => {
    try {
      closeOptionsMenu();
      logOut();
      showToast('success', 'Deslogado com sucesso');
      console.info('user & userToken removidos com sucesso.');
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

  const handleProfileDonoScreen = () => {
    navigationService.navigate(ProfileDonoScreen);
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
          {/* <Menu.Item title="Reportar Bug" /> */}
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
                source={require('../../assets/images/default_profile_avatar.webp')}
              />
            </TouchableOpacity>
          }>
          <Menu.Item title={'Username: ' + user?.username} />
          {/* <Menu.Item
            title="Ver perfil de tutor"
            onPress={handleProfileDonoScreen}
          /> */}
          {/* <Menu.Item title="Trocar de pet" /> */}
          {/* <Menu.Item title="Definir como pet principal" /> */}
        </Menu>
      </Appbar.Header>

      <Tab.Navigator
        initialRouteName="Dashboard"
        activeColor="#202020"
        inactiveColor="#202020"
        shifting={true}
        barStyle={{backgroundColor: '#5D6BB0'}}>
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
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
            tabBarLabel: 'Dasboard',
            tabBarColor: '#000000',
            tabBarIcon: RenderDashboardTabBarIcon,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfilePetsScreen}
          options={{
            title: 'Pets',
            tabBarLabel: 'Pets',
            tabBarColor: '#EDBA54',
            tabBarIcon: RenderPerfilTabBarIcon,
          }}
        />
        <Tab.Screen
          name="PerfilTutor"
          component={ProfileDonoScreen}
          options={{
            title: 'Tutor',
            tabBarLabel: 'Tutor',
            tabBarColor: '#54d6ed',
            tabBarIcon: RenderPerfilTutorTabBarIcon,
          }}
        />
      </Tab.Navigator>
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
