import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RecuperacaoContaScreen from '../screens/RecuperacaoConta/RecuperacaoContaScreen';
import RegistroScreen from '../screens/Registro/RegistroScreen';
import HomeScreen from '../screens/Home/Home';
import { useAuthContext } from '../contexts/authContext';
import { RootStackParamList } from '../types/types';

const Navigation = () => {
  const { userToken } = useAuthContext();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="RecuperacaoConta" component={RecuperacaoContaScreen}/>
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
