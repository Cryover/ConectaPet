/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { UserInfo, UserInfoResponse } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosIstance';
import { useLoading } from './loadingContext';

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
  const { startLoading, stopLoading } = useLoading();

  const logIn = async (response: UserInfoResponse) => {
    try {
        const formatedResponse = response;

        console.log('Response login', response);
        setUserToken(formatedResponse.userToken);
        setUserInfo(formatedResponse.usuario);
        return true;
      } catch (err) {
        console.error('Erro ao salvar userInfo and Token:', err);
        return false;
      }
  };

  const logOut = async () => {
    try {
        setUserToken(null);
      } catch (err) {
        console.error('Error ao remover userToken:', err);
      }
  };

  const getUserToken = async () => {
    try {
      startLoading();
      const tokenResponse = await AsyncStorage.getItem('userToken');

      if (tokenResponse && tokenResponse !== null){
        const newToken = {
          token: tokenResponse,
        };
        const response = await axiosInstance.post('/login/verificartoken', newToken);
        if (response){
          setUserToken(newToken.token);
          console.log('Token is still valid:', newToken.token);
        }
      }
    } catch (err){
        console.log(err);
        console.log('User needs to login again');
    } finally {
        stopLoading();
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, userInfo, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
