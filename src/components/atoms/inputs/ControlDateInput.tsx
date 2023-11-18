import React from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';

interface ControlDateInputProps {
  control: Control<FieldValues>;
  label: string;
  name: string;
  mode: 'flat' | 'outlined';
  inputMode?: 'start' | 'end';
}

const ControlDateInput: React.FC<ControlDateInputProps> = ({
  control,
  label,
  name,
  mode,
  inputMode,
}) => {
  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Controller
        name={name}
        control={control}
        render={({field, fieldState}) => (
          <>
            <DatePickerInput
              locale="pt"
              label={label}
              mode={mode}
              value={field.value}
              onChange={field.onChange}
              inputMode={inputMode ? inputMode : 'start'}
              error={fieldState.error ? true : false}
            />
            {fieldState.error && (
              <Text style={{color: 'red'}}>{fieldState.error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default ControlDateInput;
