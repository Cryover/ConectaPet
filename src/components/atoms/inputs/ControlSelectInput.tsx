import React from 'react';
import {View, Text, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {SelectOptionEntry} from '../../../types/types';

interface ControlSelectInputProps {
  control: Control<FieldValues>;
  rules?: RegisterOptions<FieldValues, string> | undefined;
  name: string;
  label: string;
  options: SelectOptionEntry[];
  style?: StyleProp<TextStyle | ViewStyle>;
  onValueChange?: (value: any) => void;
  initialValue?: any;
}

const ControlSelectInput: React.FC<ControlSelectInputProps> = ({
  control,
  rules,
  name,
  label,
  options,
  style,
  onValueChange,
  initialValue,
}) => {
  return (
    <View style={style}>
      <Text>{label}</Text>
      <Controller
        control={control}
        rules={rules}
        render={({field}) => (
          <Picker
            selectedValue={field.value}
            onValueChange={itemValue => {
              field.onChange(itemValue);
              onValueChange && onValueChange(itemValue);
            }}>
            {options.map(option => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        )}
        name={name}
        defaultValue={initialValue ? initialValue : ''}
      />
    </View>
  );
};

export default ControlSelectInput;
