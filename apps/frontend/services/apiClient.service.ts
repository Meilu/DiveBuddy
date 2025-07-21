import axios from 'axios';

export const createApiClient = (baseURL: string, getToken: () => Promise<string | undefined>) => {
  const apiClient = axios.create({ baseURL });

  apiClient.interceptors.request.use(
    async (config) => {
      const accessToken = await getToken();
      
      if (accessToken)
        config.headers['Authorization'] = `Bearer ${accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return apiClient;
};
