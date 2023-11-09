import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import Home from '../screens/Home/Home';
import RecuperacaoContaScreen from '../screens/RecuperacaoConta/RecuperacaoContaScreen';
import RegistroScreen from '../screens/Registro/RegistroScreen';
import { useAuthContext } from '../contexts/authContext';
import { Text } from 'react-native-svg';

const Navigation = () => {
  const { userToken } = useAuthContext();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Text>{userToken}</Text>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {}
      {userToken == null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="RecuperacaoConta" component={RecuperacaoContaScreen}/>
          </>
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
