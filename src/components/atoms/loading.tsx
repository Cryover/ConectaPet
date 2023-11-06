import {ActivityIndicator, Text, View} from 'react-native';

export default function Loading() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#5D6BB0'}}>Carregando...</Text>
      <ActivityIndicator animating={true} size="large" color={'#5D6BB0'} />
    </View>
  );
}
