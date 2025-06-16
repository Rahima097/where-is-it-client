import axios from 'axios';
import { useAuth } from '../contexts/AuthContext/AuthProvider';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 🔒 Add request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken(); // Firebase token
            config.headers.authorization = `Bearer ${token}`;
          } catch (error) {
            console.error('Error getting Firebase token:', error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate, user]);

  return axiosSecure;
};

export default useAxiosSecure;
