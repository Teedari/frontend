import { notification } from "antd";
import axios, { AxiosError } from "axios";

interface ErrorData {
  error: any;
  message: any;
}

enum ErrorCodeOptions {
  VALIDATION_ERROR = "ValidationError",
  DEFAULT_ERROR = "Error",
}

export interface ErrorResponseData {
  success: boolean;
  err: {
    title: string;
    code: number;
  };
  message: string;
}

type ErrorHandlerProps = (error: AxiosError) => any;
export class APIClient {
  axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });
  errors = [];
  dispatcher = null;
  constructor(BASE_URL = null, errorHandlers?: ErrorHandlerProps) {
    if (BASE_URL !== null) {
      this.axiosInstance.defaults.baseURL = BASE_URL;
    }

    if (errorHandlers) {
      this.axiosInstance.interceptors.response.use(
        (response: any) => response,
        errorHandlers
      );
    } else {
      this.axiosInstance.interceptors.response.use(
        (response: any) => response,
        this.axiosInstanceErrorFn
      );
    }
  }

  setBearerToken = (token: string) => {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    // this.axiosInstance.defaults.headers.common["Cookie"] = cookie?.serialize(
    //   "token",
    //   token
    // );
  };

  useMultipart = () => {
    this.axiosInstance.defaults.headers.common["Content-Type"] =
      "multipart/form-data";
  };
  removeAccessToken = () => {
    this.axiosInstance.defaults.headers.common["Authorization"] = "";
  };
  // setDispatcher = (dispatch) => {
  //   this.dispatcher = dispatch;
  // };
  get client() {
    return this.axiosInstance;
  }
  protected post = (url: string, payload: any) =>
    this.axiosInstance.post(url, payload);
  protected get = (url: string) => this.axiosInstance.get(url);
  protected put = (url: string, payload: any) =>
    this.axiosInstance.put(url, payload);
  protected patch = (url: string, payload: any) =>
    this.axiosInstance.patch(url, payload);
  protected delete = (url: string) => this.axiosInstance.delete(url);

  axiosInstanceErrorFn = (err: AxiosError) => {
    if (err.response) {
      const status = err.response?.status;
      const data: ErrorResponseData = err.response?.data as ErrorResponseData;
      if (status < 500) {
        notification.error({
          message: data.message,
        });
        return Promise.reject({ error: true, ...data.err });
      }

      if (status === 500) {
        notification.error({
          message:
            "Oops! Something went wrong on our end. We are working on fix for this issue",
        });
      }

      return Promise.reject({ error: data?.err, status });
    }

    if (err?.code === "ERR_NETWORK") {
      notification.warning({
        message: "Connection lost, try connecting back your internet",
      });
    }
  };
}
