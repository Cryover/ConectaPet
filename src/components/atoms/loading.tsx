import {ActivityIndicator, Text, View} from 'react-native';

export default function Loading() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Carregando...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
