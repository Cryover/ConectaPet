import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divCenter: {
    flex: 1,
    'justify-content': 'center',
    'align-items': 'center',
    'text-align': 'center',
    'min-height': '100vh',
  },
});

export default GlobalStyles;
