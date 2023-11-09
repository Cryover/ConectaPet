import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './contexts/authContext';
import { LoadingProvider } from './contexts/loadingContext';
//import {Provider} from 'react-redux';
//import store from './store/store';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <PaperProvider>
        <LoadingProvider>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </LoadingProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fffff',
  },
});
