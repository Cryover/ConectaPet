import React, { useEffect, useState } from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Appbar, Avatar, IconButton, Menu} from 'react-native-paper';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Dashboard from '../Dashboard/Dashboard';
import HistoricoScreen from '../Historico/Historico';
import Profile from '../Profile/ProfilePets/ProfilePets';
import AgendaScreen from '../../components/molecules/Agenda/Agenda';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../contexts/authContext';
import { RenderAgendaTabBarIcon, RenderDashboardTabBarIcon, RenderHistoricoTabBarIcon, RenderPerfilTabBarIcon } from '../../components/molecules/MaterialCommunityIcons/MaterialCommunityIcons';
import { HomeScreenNavigationProp, PetInfo } from '../../types/types';

const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({ navigation }) => {
  const Tab = createMaterialBottomTabNavigator();
  const [visibleMenu, setVisibleMenu] = useState(true);
  const [visiblePetMenu, setVisiblePetMenu] = useState(true);
  const openOptionsMenu = () => setVisibleMenu(true);
  const closeOptionsMenu = () => setVisibleMenu(false);
  const openPetOptionsMenu = () => setVisiblePetMenu(true);
  const closePetOptionsMenu = () => setVisiblePetMenu(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const { logOut } = useAuthContext();
  //const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [chosenPet, setChosenPet] = useState<PetInfo>();

  const logout = async () => {
    try {
      closeOptionsMenu();
      logOut();
      console.info('user & userToken removidos com sucesso.');
      navigation.navigate('Login');
    } catch (err) {
      console.error('Erro ao remover userToken:', err);
    }
  };

  const getChosenPet = async () => {
    try {
      const petInfo = await AsyncStorage.getItem('petInfo');

      if (petInfo){
        const petInforFormated: PetInfo = JSON.parse(petInfo);
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
          <Menu.Item title="Reportar Bug" />
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
          <Menu.Item title="Trocar de Pet" />
          <Menu.Item title="Definir como Pet Principal" />
        </Menu>
      </Appbar.Header>

      <Tab.Navigator
        initialRouteName="Dashboard"
        activeColor="#202020"
        inactiveColor="#202020"
        shifting={true}
        barStyle={{backgroundColor: '#5D6BB0'}}>
        <Tab.Screen
          name="Histórico"
          component={HistoricoScreen}
          options={{
            title: 'Histórico',
            tabBarLabel: 'Historico',
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
  input: {
    //height: 40,
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
