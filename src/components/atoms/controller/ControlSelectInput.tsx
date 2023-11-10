import React from 'react';
import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { SelectOptionEntry } from '../../../types/types';

interface ControlSelectInputProps {
    control: Control<FieldValues>;
    name: string;
    label: string;
    options: SelectOptionEntry[];
    style?: StyleProp<TextStyle | ViewStyle>;
}

const ControlSelectInput: React.FC<ControlSelectInputProps> = ({ control, name, label, options, style }) => {
  return (
    <View style={style}>
      <Text>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        )}
        name={name}
        defaultValue=""
      />
    </View>
  );
};

export default ControlSelectInput;
