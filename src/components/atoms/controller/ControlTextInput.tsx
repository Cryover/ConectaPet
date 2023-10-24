import React from 'react';
import {Controller} from 'react-hook-form';
import {View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';

export function ControlTextInput({
  control,
  name,
  rules,
  ...textInputProps
}: any) {
  const theme = useTheme();
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => (
          <>
            <View>
              <TextInput
                {...textInputProps}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error}
              />
            </View>
            <Text
              style={{
                color: theme.colors.error,
              }}>
              {fieldState.error ? fieldState.error.message : ''}
            </Text>
          </>
        )}
      />
    </View>
  );
}
