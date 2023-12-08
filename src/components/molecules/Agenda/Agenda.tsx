/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable dot-notation */
import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
  LocaleConfig,
  AgendaProps,
} from 'react-native-calendars';
import testIDs from '../../../types/testIDs';
import moment from 'moment';

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

const AgendaComponent: React.FC<AgendaProps> = ({
  //items,
  markedDates,
  markingType,
}) => {
  const [items, setItems] = useState<AgendaSchedule | undefined>(undefined);
  const currentDate = moment().format('YYYY-MM-DD');
  const maximalDate = moment().add(20, 'years').format('YYYY-MM-DD');
  const minimalDate = moment().subtract(20, 'years').format('YYYY-MM-DD');

  /* const reservationsKeyExtractor = (item: AgendaEntry, index: number) => {
    return `${item?.reservation?.day}${index}`;
  }; */

  const loadItems = (day: DateData) => {};

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const generateRandomShedules = (day: DateData) => {
    const currentItems = items || {};
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!currentItems[strTime]) {
          currentItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            currentItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(currentItems).forEach(key => {
        newItems[key] = currentItems[key];
      });
      setItems(newItems);
    }, 1000);
  };

  useEffect(() => {
    // This will be called after the component mounts
    // You can perform any initial actions here
  }, []);

  return (
    <>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={items}
        loadItemsForMonth={generateRandomShedules}
        selected={currentDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        style={styles.container}
        markingType={markingType}
        maxDate={maximalDate}
        minDate={minimalDate}
        markedDates={markedDates}
        theme={{
          calendarBackground: 'white',
          agendaKnobColor: '#5D6BB0',
          dotColor: '#5D6BB0',
          indicatorColor: '#5D6BB0',
          selectedDayBackgroundColor: '#5D6BB0',
          todayTextColor: 'black',
          agendaTodayColor: '#5D6BB0',
          selectedDayTextColor: '#5D6BB0',
        }}
        firstDay={7}
        /* reservationsKeyExtractor={reservationsKeyExtractor} */
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default AgendaComponent;
