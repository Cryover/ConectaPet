import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.overlay}>
      {/* <Text style={{color: '#5D6BB0'}}>Carregando...</Text> */}
      <ActivityIndicator size={64} color={'#5D6BB0'} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
