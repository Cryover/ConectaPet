import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.centerView}>
      {/* <Text style={{color: '#5D6BB0'}}>Carregando...</Text> */}
      <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#5D6BB0',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background to dim the content
  },
});
