import { PaperProvider } from 'react-native-paper';
import Navigation from './navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthProvider } from './contexts/authContext';
import { LoadingProvider } from './contexts/loadingContext';
import { registerTranslation } from 'react-native-paper-dates';
import { useEffect } from 'react';
import { registerDefaultLocale } from 'react-native-use-form';
//import {Provider} from 'react-redux';
//import store from './store/store';

export default function App() {

  const initializeTranslations = () => {
    registerTranslation('pt', {
      save: 'Salvar',
      selectSingle: 'Selecione a data',
      selectMultiple: 'Selecione as datas',
      selectRange: 'Selecione o período',
      notAccordingToDateFormat: (inputFormat) =>
        `Formato de data deve ser ${inputFormat}`,
      mustBeHigherThan: (date) => `Deve ser depois de ${date}`,
      mustBeLowerThan: (date) => `Deve ser antes de ${date}`,
      mustBeBetween: (startDate, endDate) =>
        `Deve ser entre ${startDate} - ${endDate}`,
      dateIsDisabled: 'Data desabilitada',
      previous: 'Anterior',
      next: 'Próxima',
      typeInDate: 'Digite em formato de data',
      pickDateFromCalendar: 'Selecione uma data do calendario',
      close: 'Fechar',
    });
    registerDefaultLocale('pt');
  };

  useEffect(() => {
    initializeTranslations();
  }, []);

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
