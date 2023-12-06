import React from 'react';
import {View, Text, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {SelectOptionEntry} from '../../../types/types';

interface ControlNewSelectInputProps {
  control: Control<FieldValues>;
  name: string;
  label: string;
  options: SelectOptionEntry[];
  style?: StyleProp<TextStyle | ViewStyle>;
  onValueChange?: (value: any) => void;
}

const ControlNewSelectInput: React.FC<ControlNewSelectInputProps> = ({
  control,
  name,
  label,
  options,
  style,
  onValueChange,
}) => {
  return (
    <View style={style}>
      <Text>{label}</Text>
      <Controller
        control={control}
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
        defaultValue={options[0].value}
      />
    </View>
  );
};

export default ControlNewSelectInput;
