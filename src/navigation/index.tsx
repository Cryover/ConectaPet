/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import Loading from '../components/atoms/loading';
import Home from '../screens/Home/Home';
import RecuperacaoContaScreen from '../screens/RecuperacaoConta/RecuperacaoContaScreen';
import RegistroScreen from '../screens/Registro/RegistroScreen';

const Navigation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const Stack = createNativeStackNavigator();

  const getUserToken = async () => {
    // testing purposes
    const sleep = (ms: number | undefined) =>
      new Promise(r => setTimeout(r, ms));
    try {
      // custom logic
      await sleep(2000);
      const token = null;
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          //initialParams={{setUserToken}}
        />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen
          name="RecuperacaoConta"
          component={RecuperacaoContaScreen}
        />

        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
