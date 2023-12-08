/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';

interface ControlDateInputProps {
  control: Control<FieldValues>;
  rules?: RegisterOptions<FieldValues, string> | undefined;
  label: string;
  name: string;
  mode: 'flat' | 'outlined';
  inputMode?: 'start' | 'end';
  initialValue?: Date;
  style?: StyleProp<TextStyle | ViewStyle>;
}

const ControlDateInput: React.FC<ControlDateInputProps> = ({
  control,
  rules,
  label,
  name,
  mode,
  inputMode,
  initialValue,
  style,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({field, fieldState}) => (
          <>
            <DatePickerInput
              locale="pt"
              label={label}
              mode={mode}
              value={field.value || initialValue}
              onChange={field.onChange}
              inputMode={inputMode ? inputMode : 'start'}
              error={fieldState.error ? true : false}
              style={{width: '100%'}}
            />
            {fieldState.error && (
              <Text style={{color: 'red', marginTop: 20}}>
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default ControlDateInput;
