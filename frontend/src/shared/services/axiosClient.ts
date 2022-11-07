import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

interface IApiError {
  message: string;
}

class ApiClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.setInterceptors();
  }

  private setInterceptors() {
    this.instance.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError<IApiError>) => {
        const { response } = error;

        let message = 'Aconteceu algum erro';

        if (response != null) {
          if (Math.floor(response.status / 100) === 4) {
            if (response.data.message != null) {
              message = response.data.message;
            } else if (response.status === 401) {
              message = 'Ação não Autorizada';
            } else {
              message = 'Não foi possivel completar a ação!';
            }
          } else if (Math.floor(response.status / 100) === 5) {
            message = 'Erro interno no servidor';
          }
        }

        return await Promise.reject(message);
      },
    );

    this.instance.interceptors.request.use((config) => {
      // add the authorization to the headers
      const token = localStorage.getItem('@GuiaFontes:token');

      config.headers = {
        ...config.headers,
        Authorization: token != null ? `Bearer ${token}` : false,
      };

      return config;
    });
  }

  get = async <T>(url: string, config?: AxiosRequestConfig) =>
    await this.instance.get<T, T>(url, config);

  post = async <T, D>(url: string, data: D, config?: AxiosRequestConfig) =>
    await this.instance.post<T, T, D>(url, data, config);

  put = async <T, D>(url: string, data: D, config?: AxiosRequestConfig) =>
    await this.instance.put<T, T, D>(url, data, config);

  patch = async <T, D>(url: string, data: D, config?: AxiosRequestConfig) =>
    await this.instance.patch<T, T, D>(url, data, config);

  delete = async <T>(url: string, config?: AxiosRequestConfig) =>
    await this.instance.delete<T, T>(url, config);
}

const axiosClient = new ApiClient(process.env.REACT_APP_API_BASE_URL ?? '');

export { axiosClient };
