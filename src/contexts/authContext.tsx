/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {User} from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosIstance';
import {useLoading} from './loadingContext';
import {useToast} from './toastContext';
import {API_PROD_URL} from '@env';

interface AuthContextType {
  userToken: string | null;
  setUserToken: (token: string | null) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
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
    throw new Error('useAuthContext must be used within a MyProvider');
  }

  //console.log(context);
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>();
  const [userToken, setUserToken] = useState<string | null>(null);
  const {startLoading, stopLoading} = useLoading();
  const {showToast} = useToast();

  const logIn = async (dataFields: any) => {
    try {
      startLoading();
      //await AsyncStorage.clear();
      const response = await axiosInstance.post('/login', dataFields);
      console.log('Response.data login', response.data);
      console.log('Usuario', response.data.usuario);
      if (response) {
        setUser(response.data.usuario);
        setUserToken(response.data.userToken);
        console.log(API_PROD_URL);
        await AsyncStorage.setItem('userToken', response.data.userToken);
        await AsyncStorage.setItem(
          'userStored',
          JSON.stringify(response.data.usuario),
        );
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      stopLoading();
    }
  };

  const logOut = async () => {
    try {
      setUser(undefined);
      setUserToken(null);
      await AsyncStorage.removeItem('userStored');
      await AsyncStorage.removeItem('userToken');
      showToast('success', 'Deslogado com sucesso');
    } catch (err) {
      console.error('Erro ao remover userStored e UserToken:', err);
    }
  };

  const getUserInfo = async () => {
    try {
      startLoading();
      //await AsyncStorage.clear();
      const [userStored, userTokenStored] = await Promise.all([
        AsyncStorage.getItem('userStored'),
        AsyncStorage.getItem('userToken'),
      ]);

      //console.log('userStored', userStored);
      //console.log('userToken', userTokenStored);
      if (userStored && userTokenStored) {
        console.log('AQUI', userTokenStored);

        await axiosInstance
          .post('/login/verificartoken', undefined, {
            headers: {
              Authorization: `Bearer ${userTokenStored}`,
            },
          })
          .then(response => {
            if (response.status === 200) {
              console.log('Deu certo');
              const formatedUser: User = JSON.parse(userStored);
              console.log(formatedUser);
              setUser(formatedUser);
              setUserToken(userTokenStored);
            }
          })
          .catch(err => {
            console.log('ERRO', err);
          });
      }
    } catch (err) {
      console.log(err);
      showToast('error', 'Token Expirado, favor fazer login novamente');
      stopLoading();
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{userToken, setUserToken, user, setUser, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};
