import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './navigation';
import {StyleSheet} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <PaperProvider>
        <Navigation />
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
