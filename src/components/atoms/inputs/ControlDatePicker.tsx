/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {Control, Controller, FieldValues, useForm} from 'react-hook-form';

interface CustomControlDatePickerProps {
  mode: 'single' | 'range' | 'multiple';
  control: Control<FieldValues>;
  name: string;
  defaultValue?: string;
  //style: StyleProp<TextStyle | ViewStyle>;
}

const ControlDatePicker: React.FC<CustomControlDatePickerProps> = ({
  control,
  mode,
  name,
  defaultValue,
}) => {
  const {handleSubmit, setValue} = useForm();
  const [range, setRange] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onSubmit = (data: any) => {
    // Handle form submission with the selected date
    console.log(data);
  };

  const onConfirm = useCallback(
    (params: any) => {
      setOpen(false);
      setValue('date', params.date); // Set the date value in React Hook Form
    },
    [setOpen, setValue],
  );

  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Pick single date
      </Button>
      {mode === 'single' && (
        <Controller
          control={control}
          render={({field}) => (
            <DatePickerModal
              locale="pt"
              mode="single"
              visible={open}
              onDismiss={onDismiss}
              date={field.value}
              onConfirm={onConfirm}
            />
          )}
          name="date"
          defaultValue={undefined}
        />
      )}

      {mode === 'range' && (
        <Controller
          control={control}
          render={({field}) => (
            <DatePickerModal
              locale="pt"
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              startDate={range.startDate}
              endDate={range.endDate}
              onConfirm={onConfirm}
            />
          )}
          name="date"
          defaultValue={undefined}
        />
      )}

      {mode === 'multiple' && (
        <Controller
          control={control}
          render={({field}) => (
            <DatePickerModal
              locale="pt"
              mode="multiple"
              visible={open}
              onDismiss={onDismiss}
              date={field.value}
              onConfirm={onConfirm}
            />
          )}
          name="date"
          defaultValue={undefined}
        />
      )}
      <Button
        onPress={handleSubmit(onSubmit)}
        uppercase={false}
        mode="contained">
        Confirmar
      </Button>
    </View>
  );
};

export default ControlDatePicker;
