import React from 'react';
import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {TimePickerModal} from 'react-native-paper-dates';

interface TimeInputProps {
  onDismiss: () => void;
  onConfirm?: (hours: any, minutes: any) => void;
  name: string;
  label: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions<FieldValues, string> | undefined;
  style?: StyleProp<TextStyle | ViewStyle>;
  secureTextEntry?: boolean;
  initialValue?: string;
  visible: boolean;
}

const CustomTimeModal: React.FC<TimeInputProps> = ({
  name,
  label,
  control,
  initialValue,
  visible,
  onDismiss,
  style,
}) => {
  const onConfirm = (hours: number, minutes: number) => {
    console.log(hours, minutes);
  };

  return (
    <View style={style}>
      <Controller
        name={name}
        control={control}
        defaultValue={initialValue ? initialValue : ''}
        render={({field}) => (
          <TimePickerModal
            visible={visible}
            label={label}
            locale={'pt'}
            onDismiss={onDismiss}
            onConfirm={({hours, minutes}): void => {
              field.onChange(`${hours}:${minutes}`);
              onConfirm(hours, minutes);
            }}
            hours={new Date().getHours()}
            minutes={new Date().getMinutes()}
            use24HourClock={true}
          />
        )}
      />
    </View>
  );
};

export default CustomTimeModal;
