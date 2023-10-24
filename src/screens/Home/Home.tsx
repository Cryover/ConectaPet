/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Appbar, Avatar, IconButton, Menu} from 'react-native-paper';
import {Platform, StyleSheet} from 'react-native';
import Profile from '../Profile/Profile';
import Dashboard from '../Dashboard/Dashboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Historico from '../Historico/Historico';
//import {useRoute} from '@react-navigation/native';

const Home = () => {
  const Tab = createMaterialBottomTabNavigator();
  const [visible, setVisible] = React.useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  return (
    <>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="" />
        <Menu
          style={styles.menu}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon={MORE_ICON} onPress={openMenu} />}>
          <Menu.Item title="Reportar Bug" />
          <Menu.Item title="Logout" />
        </Menu>
        <Avatar.Image
          size={40}
          source={require('../../assets/images/avatar.webp')}
        />
      </Appbar.Header>

      <Tab.Navigator
        initialRouteName="Dashboard"
        activeColor="#ececec"
        inactiveColor="#202020"
        shifting={true}
        barStyle={{backgroundColor: '#5D6BB0'}}>
        <Tab.Screen
          name="Histórico"
          component={Historico}
          options={{
            title: 'Histórico',
            tabBarLabel: 'Historico',
            tabBarColor: '#EDBA54',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            tabBarLabel: 'Dasboard',
            tabBarColor: '#000000',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Profile}
          options={{
            title: 'Pets',
            tabBarLabel: 'Pets',
            tabBarColor: '#EDBA54',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="dog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
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
  },
  menu_item: {},
});
