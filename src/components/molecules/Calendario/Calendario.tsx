/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';
import {windowWidth} from '../../../styles/Style';
import moment from 'moment';
import {MarkedDates} from 'react-native-calendars/src/types';

LocaleConfig.locales['pt'] = {
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
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt';

interface CalendarioProps {
  onDayPress: (selectedDay: string) => void;
  onMonthChange: (selectedMonth: string) => void;
  markedDates?: MarkedDates | undefined;
}

const Calendario: React.FC<CalendarioProps> = ({
  onDayPress,
  onMonthChange,
  markedDates,
}) => {
  const [selectedDay, setSelectedDay] = React.useState('');

  const showDaySelected = (day: DateData) => {
    const formatedDay = moment(day.dateString).format('DD/MM/YYYY');
    setSelectedDay(formatedDay);
    onDayPress(day.dateString);
    //console.log(day);
  };
  // MarkedDates
  // [selectedDay]: {
  //  selected: true,
  //  disableTouchEvent: false,
  // },

  const showMonthSelected = (month: DateData) => {
    console.log(month.month);
    onMonthChange(month.dateString);
    //console.log(month);
  };

  return (
    <>
      <Calendar
        onDayPress={day => {
          showDaySelected(day);
        }}
        onMonthChange={month => {
          showMonthSelected(month);
        }}
        markedDates={markedDates}
        firstDay={7}
        //displayLoadingIndicator={true}
        enableSwipeMonths={true}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          width: windowWidth - 40,
          height: 'auto',
        }}
        theme={
          {
            //
          }
        }
        //current={new Date().toLocaleDateString()}
      />
    </>
  );
};

export default Calendario;
