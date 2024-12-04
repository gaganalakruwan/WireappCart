import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

const BASE_URL = 'https://s3-eu-west-1.amazonaws.com';

class ApiService {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    /**
     * Uncomment the following code to add the access token and refresh token to the headers
     */
    // const {tokens} = JSON.parse(AsyncStorage.getItem('persist:auth') || '{}');
    // const {accessToken, refreshToken} = JSON.parse(tokens || '{}');
    ApiService.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        /**
         * Uncomment the following code to add the access token and refresh token to the headers
         */
        // Authorization: `Bearer ${accessToken}`,
        // refreshToken: refreshToken,
      },
    });
  }

  /**
   * Use this method to make a get request
   * @param url address to get data from
   * @param config configuration for the request
   * @returns data from the request
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.axiosInstance.get(
      url,
      config,
    );
    return response.data;
  }

  /**
   * Use this method to make a post request
   * @param url address to post data to
   * @param data data to post
   * @param config configuration for the request
   * @returns data from the request
   */
  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.axiosInstance.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * Use this method to make a put request
   * @param url address to put data to
   * @param data data to put
   * @param config configuration for the request
   * @returns data from the request
   */
  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.axiosInstance.put(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * Use this method to update the access token and refresh token from api calls
   * @param accessToken access token to update
   * @param refreshToken refresh token to update
   */
  public updateTokens(accessToken: string, refreshToken: string) {
    ApiService.axiosInstance = axios.create({
      baseURL: BASE_URL,
      // timeout: Infinity, // Set your desired timeout value
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        refreshToken: refreshToken,
      },
    });
  }

}

export default ApiService;
