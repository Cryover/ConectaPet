import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Styles from './styles/style';
//import Footer from './components/footer';

const App = () => {
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
