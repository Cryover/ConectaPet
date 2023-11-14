/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { UserInfo } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosIstance';
import { useLoading } from './loadingContext';

interface AuthContextType {
  userToken: string | null,
  user: UserInfo | undefined;
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
  const [user, setUser] = useState<UserInfo>();
  const [userToken, setUserToken] = useState<string | null>(null);
  const { startLoading, stopLoading } = useLoading();

  const logIn = async (dataFields:any) => {
    try {
        startLoading();
        await AsyncStorage.clear();
        const response = await axiosInstance.post('/login', dataFields);
        console.log('Response.data', response.data);
        console.log('Usuario', response.data.usuario);
        if (response){
          setUser(response.data.usuario);
          setUserToken(response.data.userToken);

          await AsyncStorage.setItem('userToken', response.data.userToken);
          await AsyncStorage.setItem('userStored', JSON.stringify(response.data.usuario));
        }
        return true;
      } catch (err) {
        console.error(err);
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
      const formatedUserToken = {
        token: userTokenStored,
      };
      console.log('userStored', userStored);
      console.log('userToken', userTokenStored);
      if (userStored && userTokenStored){
        const response = await axiosInstance.post('/login/verificartoken', formatedUserToken);
        console.log('response', response.status);
        if (response.status === 200){
          const formatedUser:UserInfo = JSON.parse(userStored);
          setUser(formatedUser);
          setUserToken(userTokenStored);
        } else {
          throw Error('Token Expirado');
        }
      }
      return true;
    } catch (err){
        console.log(err);
        console.error('Token Expirado favor fazer login novamente');
        return false;
    } finally {
        stopLoading();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
