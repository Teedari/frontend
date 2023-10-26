import { AxiosError } from "axios";
import { APIClient, ErrorResponseData } from "../libs/axios-client";
import { notification } from "antd";
import CustomLocalStorage from "../libs/local-storage";
// import { UserRole } from "./user.service";
// Enums
enum Endpoints {
  LOGIN = "auth/login",
  REGISTER = "auth/register",
  USER = "auth/user",
  REGISTER_PROSPECT = "auth/register-prospect",
}

// Interfaces

export interface AuthSignInUser {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

interface ErrorData {
  success: boolean;
  error: { message?: string; stack?: any };
}

const AuthenticateErrorInterceptor = (error: AxiosError) => {
  if (error?.code === "ERR_NETWORK") {
    notification.warning({
      message: "Connection lost, try connecting back your internet",
    });
  }
  if (!error.response) return Promise.reject(error);
  const { status, data } = error.response;
  const errRes = data as ErrorResponseData;

  if (status >= 400 && status <= 403)
    notification.error({ message: errRes.message });

  return Promise.reject(errRes);
};

export default class AuthService extends APIClient {
  constructor() {
    super(null, AuthenticateErrorInterceptor);
  }

  private persistCredentials = (data: any, token?: string) =>
    CustomLocalStorage.login(data, token);

  login = async (user: AuthSignInUser) => {
    return this.post(Endpoints.LOGIN, user).then((res) => {
      this.persistCredentials(res.data?.user, res.data?.accessToken);
      return res;
    });
  };

  getCurrentUser = async () => {
    return this.get(Endpoints.USER).then(({ data }) => {
      // this.persistCredentials(
      //   { email: user, name: "Test User" },
      //   res.data?.token
      // );
      return {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        fullname: data.user?.profile?.fullName,
        isCompleted: data.user?.profile?.profileIsCompleted,
        status: data.user?.profile?.status,
      };
    });
  };

  logout = () => CustomLocalStorage.clear();
}
