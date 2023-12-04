import React, {createContext, useContext, ReactNode, useState} from 'react';
import {Snackbar} from 'react-native-paper';

interface SnackbarContextProps {
  children: ReactNode;
}

interface SnackbarContextValue {
  showSnackbar: (msg: string) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<SnackbarContextProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setIsVisible(true);
  };

  const hideSnackbar = () => {
    setIsVisible(false);
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar, hideSnackbar}}>
      {/* {children}
      {isVisible && (
        // Display the Snackbar using react-native-paper
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          {message} */}
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
