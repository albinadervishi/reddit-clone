import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class BaseService {
  protected api: AxiosInstance;
  private static BASE_URL = "https://6040c786f34cf600173c8cb7.mockapi.io";

  constructor() {
    this.api = axios.create({
      baseURL: BaseService.BASE_URL,
      headers: { "Content-type": "application/json" },
    });

    this.api.interceptors.request.use(
      (config) => {
        console.log("API Request:", {
          url: config.url,
          method: config.method,
          params: config.params,
        });
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    if (config?.params) {
      const { page, limit } = config.params;
      if (page !== undefined) {
        config.params.page = page;
      }

      if (limit !== undefined) {
        config.params.limit = limit;
      }
    }

    return this.api.get<T, T>(url, config);
  }

  protected post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.api.post<T, T>(url, data, config);
  }

  protected put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.api.put<T, T>(url, data, config);
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.delete<T, T>(url, config);
  }
}

export default BaseService;
