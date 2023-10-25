import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {View, Button, StyleSheet} from 'react-native';
import ControlTextInput from '../atoms/controller/ControlTextInput';

const CadastroDespesasModal = () => {
  const {control, handleSubmit} = useForm();
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <View>
        <ControlTextInput
          name={'nomeItem'}
          control={control}
          label={'Nome do Item'}
          style={styles.input}
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  );
};

export default CadastroDespesasModal;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5D6BB0',
  },
  input: {
    //height: 40,
    width: 300,
  },
  button: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  links: {
    marginTop: 20,
    color: '#5D6BB0',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'center',
  },
});
