import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {TextInput as PaperTextInput, Text} from 'react-native-paper';

interface CustomTextInputProps {
  name: string;
  label: string;
  mode?: 'flat' | 'outlined' | undefined;
  multiline?: boolean;
  numberOfLines?: number;
  control: Control<FieldValues>;
  rules: RegisterOptions<FieldValues, string> | undefined; // Define the 'rules' property
  style: StyleProp<TextStyle | ViewStyle>;
  secureTextEntry?: boolean;
  initialValue?: string;
}

const ControlTextInput: React.FC<CustomTextInputProps> = ({
  name,
  label,
  mode,
  multiline,
  numberOfLines,
  control,
  style,
  rules,
  secureTextEntry,
  initialValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState}) => (
        <>
          <PaperTextInput
            label={label}
            mode={mode ? mode : 'flat'}
            multiline={multiline}
            numberOfLines={numberOfLines}
            value={field.value || initialValue}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            secureTextEntry={secureTextEntry}
            error={fieldState.error ? true : false}
            style={style}
          />
          {fieldState.error && (
            <Text style={{color: 'red'}}>{fieldState.error.message}</Text>
          )}
        </>
      )}
    />
  );
};

export default ControlTextInput;
