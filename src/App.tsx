/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { Tab, Text, TabView } from '@rneui/themed';
import Styles from './styles/style';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import Footer from './components/footer';

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5432/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);


  return (
    <SafeAreaView style={Styles.container}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary"
        >
          <Tab.Item
            title="Recent"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
          />
          <Tab.Item
            title="favorite"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
          />
          <Tab.Item
            title="cart"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
            />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
            <Text h1>Favorite</Text>
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
            <Text h1>Cart</Text>
          </TabView.Item>
        </TabView>
      </SafeAreaView>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
