import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './screens/DashboardScreen/DashboardScreen';
import Loading from './components/atoms/loading';
import AuthScreen from './screens/AuthScreen/AuthScreen';

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
      <Stack.Navigator>
        {userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="Login"
            component={AuthScreen}
            options={{
              title: 'Login',
            }}
            initialParams={{setUserToken}}
          />
        ) : (
          // User is signed in
          <Stack.Screen name="Dashboard" component={Dashboard} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
