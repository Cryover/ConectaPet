import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './components/atoms/loading';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

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
      <PaperProvider>
        <Stack.Navigator >
          {userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
                headerShown: false,
              }}
              initialParams={{ setUserToken }}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Login',
              }}
            />
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
