/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Control, useController, FieldValues, Controller} from 'react-hook-form';
import DropdownSelect from 'react-native-input-select';

interface ControlSelectMultipleInputProps {
  control: Control<FieldValues>;
  name: string;
  label: string;
  options: any[];
  style?: StyleProp<TextStyle | ViewStyle>;
  placeHolder: string;
  optionLabel: string;
  optionValue: string;
  primaryColor: string;
}

const ControlSelectMultipleInput: React.FC<ControlSelectMultipleInputProps> = ({
  control,
  label,
  name,
  options,
  optionLabel,
  optionValue,
  placeHolder,
  primaryColor,
  style,
}) => {
  const {field} = useController({
    control,
    defaultValue: [],
    name,
  });

  return (
    <View style={style}>
      <Controller
        control={control}
        render={({field}) => (
          <DropdownSelect
            label={label}
            placeholder={placeHolder}
            options={options}
            optionLabel={optionLabel}
            optionValue={optionValue}
            //selectedValue={currency}
            onValueChange={(itemValue: any) => field.onChange(itemValue)}
            isMultiple
            isSearchable
            primaryColor={primaryColor}
          />
        )}
        name={name}
        defaultValue={field.value}
      />
    </View>
  );
};

export default ControlSelectMultipleInput;
