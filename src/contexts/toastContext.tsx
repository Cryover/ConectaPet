import React, {createContext, useContext, ReactNode} from 'react';
import Toast, {ToastType} from 'react-native-toast-message';

interface ToastContextType {
  showToast: (type: ToastType | undefined, text1: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
  const showToast = (type: ToastType | undefined, text1: string) => {
    Toast.show({
      type: type ? type : 'success',
      text1: text1,
      onPress() {
        Toast.hide();
      },
    });
  };

  const hideToast = () => {
    Toast.hide();
  };

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};
