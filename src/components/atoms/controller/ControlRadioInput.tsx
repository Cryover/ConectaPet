import React from 'react';
import { RadioButton } from 'react-native-paper';
import { Control, FieldValues, useController } from 'react-hook-form';

interface ControlRadioInputProps {
  control: Control<FieldValues>;
  name: string;
  label: string;
  value: string;
}

const ControlRadioInput: React.FC<ControlRadioInputProps> = ({ control, name, value }) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <RadioButton
      value={value}
      status={field.value === value ? 'checked' : 'unchecked'}
      onPress={() => field.onChange(value)}
    />
  );
};

export default ControlRadioInput;
