import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation';
import {AuthProvider} from './src/contexts/authContext';
import {LoadingProvider} from './src/contexts/loadingContext';
import {NavigationContainer} from '@react-navigation/native';
import {registerTranslation} from 'react-native-paper-dates';
import navigationService from './src/services/navigationService';
//import {Provider} from 'react-redux';
//import store from './store/store';

export default function App() {
  const setTranslationRegistration = () => {
    registerTranslation('pt', {
      save: 'Salvar',
      selectSingle: 'Selecionar data',
      selectMultiple: 'Selecionar datas',
      selectRange: 'Selecionar período',
      notAccordingToDateFormat: inputFormat =>
        `Formato de Data deve ser ${inputFormat}`,
      mustBeHigherThan: date => `Deve ser depois de ${date}`,
      mustBeLowerThan: date => `Deve ser antes de ${date}`,
      mustBeBetween: (startDate, endDate) =>
        `Deve ser entre ${startDate} - ${endDate}`,
      dateIsDisabled: 'Dia desabilitado',
      previous: 'Anterior',
      next: 'Próxima',
      typeInDate: 'Tipo em data',
      pickDateFromCalendar: 'Selecione uma data do calendário',
      close: 'Fechar',
    });
  };

  useEffect(() => {
    setTranslationRegistration();
  }, []);

  return (
    <NavigationContainer
      ref={navigatorRef => {
        navigationService.setTopLevelNavigator(navigatorRef);
      }}>
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

/* const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
}); */
