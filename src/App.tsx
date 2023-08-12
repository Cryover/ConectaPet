import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Styles from './styles/style';
import axios from 'axios';
//import Footer from './components/footer';

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://your_backend_server_ip:your_backend_server_port/api/data')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.center}>
        <View><Text>header</Text></View>
        <ScrollView><Text>main</Text></ScrollView>
        <View>
          <Text>Footer</Text>
         {/*  <Footer name="batata"/> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default App;
