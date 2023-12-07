import React, {createContext, useContext, useState, ReactNode} from 'react';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading deve ser usado dentro de um LoadProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => {
    //console.log('isLoading', isLoading);
    setLoading(true);
  };

  const stopLoading = () => {
    //console.log('isLoading', isLoading);
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{isLoading, startLoading, stopLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};
