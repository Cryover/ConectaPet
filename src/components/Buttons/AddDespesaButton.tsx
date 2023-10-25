import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {AnimatedFAB} from 'react-native-paper';

const AddDespesaButton = (props: any) => {
  const fabStyle = {[props.animateFrom]: 16};

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFAB
        icon={'plus'}
        label={props.label}
        extended={props.extended}
        onPress={() => console.log('Pressed')}
        visible={props.visible}
        animateFrom={props.right}
        iconMode={'static'}
        style={[styles.fabStyle, props.style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default AddDespesaButton;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
