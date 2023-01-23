import axios from 'axios';
import { store } from '../../app/store';
import { Logout } from '../../slices/AuthSlice';
import { SetProgress, SetToastData } from '../../slices/ConfigSlice';

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:9001',
  timeout: 30000,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    store.dispatch(SetProgress(true));
    const { token } = store.getState().auth;
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Accept'] = `application/json`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    store.dispatch(SetProgress(false));
    return response;
  },
  async function (error) {
    store.dispatch(SetProgress(false));
    if (error.response.status === 401) {
      store.dispatch(Logout());
    }

    const message = error.response.data.message;
    const getMethod = error.config.method === 'get';
    if (!getMethod) {
      store.dispatch(
        SetToastData({
          type: 'error',
          message: typeof message === 'string' ? message : message.join(', '),
        })
      );
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
