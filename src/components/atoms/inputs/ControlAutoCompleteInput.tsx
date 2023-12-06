/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Control, Controller, FieldValues} from 'react-hook-form';
import Autocomplete from 'react-native-autocomplete-input';

interface ControlAutoCompleteInputProps {
  control: Control<FieldValues>;
  name: string;
  label: string;
  options: any[];
  style?: StyleProp<TextStyle | ViewStyle>;
}

const ControlAutoCompleteInput: React.FC<ControlAutoCompleteInputProps> = ({
  control,
  name,
  label,
  options,
  style,
}) => {
  const [query, setQuery] = useState('');
  const isLoading = !options.length;

  const placeholder = isLoading
    ? 'Carregando Informações...'
    : 'Digite o nome da Raça';

  return (
    <View style={style}>
      <Text>{label}</Text>
      <Controller
        control={control}
        render={({field}) => (
          <View style={styles.autocompleteContainer}>
            <Autocomplete
              autoCorrect={false}
              data={options}
              value={field.value}
              onChangeText={text => {
                setQuery(text);
                field.onChange(text); // Update the form field value
              }}
              placeholder={placeholder}
              flatListProps={{
                keyboardShouldPersistTaps: 'always',
                keyExtractor: item => item.id,
                renderItem: ({item}) => (
                  <TouchableOpacity onPress={() => setQuery(item.label)}>
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                ),
              }}
            />
          </View>
        )}
        name={name}
        defaultValue={options[0]?.value || ''} // Use an empty string if options[0] is undefined
      />
    </View>
  );
};

export default ControlAutoCompleteInput;

const styles = StyleSheet.create<any>({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
