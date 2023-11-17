import React from 'react';
import {PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation';
import {StyleSheet} from 'react-native';
import {AuthProvider} from './src/contexts/authContext';
import {LoadingProvider} from './src/contexts/loadingContext';
import {NavigationContainer} from '@react-navigation/native';
//import {Provider} from 'react-redux';
//import store from './store/store';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <LoadingProvider>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </LoadingProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
