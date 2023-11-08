import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import Loading from '../components/atoms/loading';
import Home from '../screens/Home/Home';
import RecuperacaoContaScreen from '../screens/RecuperacaoConta/RecuperacaoContaScreen';
import RegistroScreen from '../screens/Registro/RegistroScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getIsSignedIn = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  if (userToken !== undefined){
    return true;
  } else {
    return false;
  }
};

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const signedIn = await getIsSignedIn();
        console.log('signedIn', signedIn)
        setIsSignedIn(signedIn);
        setIsLoading(false);
      } catch (error) {
        console.error('Error while checking token:', error);
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="RecuperacaoConta" component={RecuperacaoContaScreen}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="RecuperacaoConta" component={RecuperacaoContaScreen}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
