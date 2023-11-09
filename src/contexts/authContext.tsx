import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { UserInfo } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    userToken: string | null;
    userInfo: UserInfo | undefined;
    logIn: (dataFields: any) => Promise<boolean>;
    logOut: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  //console.log(context);
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(undefined);

  const logIn = async (response: any) => {
    try {
        //console.log('Response login', response);
        setUserToken(response.userToken);
        setUserInfo(response.usuario);
        return true;
      } catch (err) {
        console.error('Erro ao salvar userInfo and Token:', err);
        return false;
      }
  };

  const logOut = async () => {
    try {
        setUserToken(null);
        console.log('userToken removido com successo.');
      } catch (err) {
        console.error('Error ao remover userToken:', err);
      }
  };

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== undefined || token !== null){
        console.log(token);
        setUserToken(token);
      }
    } catch (err){
        console.log(err);
    } finally {
        //setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  /* if (isLoading) {
    return <Loading />;
  } */

  return (
    <AuthContext.Provider value={{ userToken, userInfo, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
