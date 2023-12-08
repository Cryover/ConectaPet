/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {API_PROD_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: API_PROD_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 5 segundos
});

axiosInstance.interceptors.response.use(
  response => {
    console.info('Status Code ', response.status);
    return response;
  },
  error => {
    if (error.response) {
      const statusMessage =
        error.response.data.message || 'ERRO ' + error.response.status;

      if (error.response.status !== 404 && error.response.status !== 400) {
        console.log(
          error.response.data.message
            ? error.response.data.message
            : error.response.status,
        );
      }
      console.log(`${statusMessage}`);
      return Promise.reject(statusMessage);
    } else if (error.request) {
      console.log('Nenhuma resposta recebida');
      return Promise.reject('Nenhuma resposta recebida');
    } else {
      console.log('Request falhou');
      return Promise.reject('Request falhou');
    }
  },
);

export default axiosInstance;
