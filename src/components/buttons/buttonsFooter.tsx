import React from 'react';
import { Button } from 'react-native';

export type Props = {
    name: string;
  };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (props:Props) => {

    const Cat = () => {
        console.warn('HELLO');
    };

    return (
        <Button
            title="Executar"
            onPress={Cat}
    />
    );
};
