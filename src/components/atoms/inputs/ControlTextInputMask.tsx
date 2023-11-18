import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import MaskInput from 'react-native-mask-input';
import {Text} from 'react-native-paper';

interface CustomTextInputProps {
  name: string;
  multiline?: boolean;
  numberOfLines?: number;
  control: Control<FieldValues>;
  rules: RegisterOptions<FieldValues, string> | undefined; // Define the 'rules' property
  style: StyleProp<TextStyle | ViewStyle>;
  secureTextEntry?: boolean;
}

const ControlTextInput: React.FC<CustomTextInputProps> = ({
  name,
  multiline,
  numberOfLines,
  control,
  style,
  rules,
  secureTextEntry,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState}) => (
        <>
          <MaskInput
            value={field.value}
            style={style ? style : styles.input}
            //mask={number}
            keyboardType="numeric"
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onChangeText={(masked, unmasked) => {
              //setPhone(masked); // you can use the unmasked value as well

              // assuming you typed "9" all the way:
              console.log(masked); // (99) 99999-9999
              console.log(unmasked); // 99999999999
            }}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
