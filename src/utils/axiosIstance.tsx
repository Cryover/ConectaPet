import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_DEV_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 segundos
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log('Axios Error response', error.response.data.message);
      const statusMessage = error.response.data.message || 'Ocorreu um erro';
      return Promise.reject(statusMessage);
    } else if (error.request) {
      return Promise.reject('Nenhuma resposta recebida');
    } else {
      return Promise.reject('Request falhou');
    }
  }
);

export default axiosInstance;
