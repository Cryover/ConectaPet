import * as React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {windowWidth} from '../../../styles/Style';
import moment from 'moment';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set.',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ],
  dayNamesShort: ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.', 'Dom.'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

const Calendario = () => {
  const [selected, setSelected] = React.useState('');

  const showSelected = (day: any) => {
    const formatedDay = moment(day.dateString).format('MM/DD/YYYY');
    setSelected(formatedDay);
    console.log(formatedDay);
  };

  return (
    <>
      <Calendar
        onDayPress={day => {
          showSelected(day);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: false,
          },
        }}
        firstDay={6}
        enableSwipeMonths={true}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          width: windowWidth - 40,
          height: 'auto',
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#0f0f0f',
          selectedDayBackgroundColor: '#5D6BB0',
          selectedDayTextColor: '#5D6BB0',
          todayTextColor: '#5D6BB0',
          dayTextColor: '#2d4150',
          arrowColor: '#5D6BB0',
          textDisabledColor: '#c4c4c47b',
        }}
      />
    </>
  );
};

export default Calendario;
