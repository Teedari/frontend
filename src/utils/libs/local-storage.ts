enum Keys {
  TOKEN = "toKen",
  PROFILE = "proFile",
  IS_LOGGED_IN = "logged_in",
}

export default class CustomLocalStorage {
  static _APP_NAME = "_banking_";

  static getKey = (key: string) => {
    return CustomLocalStorage._APP_NAME?.concat(key);
  };

  static setLocalItem = (key: string, data: any) => {
    const _data = JSON.stringify(data);
    try {
      localStorage.setItem(CustomLocalStorage.getKey(key), _data);
    } catch (error) {
      console.log(error);
    }
  };

  static getLocalItem = (key: string) => {
    try {
      return JSON.parse(
        localStorage.getItem(CustomLocalStorage.getKey(key)) as string
      );
    } catch (e) {
      return null;
    }
  };

  static token = (token?: string) => {
    if (!token) return CustomLocalStorage.getLocalItem(Keys.TOKEN);

    CustomLocalStorage.setLocalItem(Keys.TOKEN, token);
  };
  static profile = (data?: any) => {
    if (!data) return CustomLocalStorage.getLocalItem(Keys.PROFILE);

    CustomLocalStorage.setLocalItem(Keys.PROFILE, data);
  };

  static isLoggedIn = () => CustomLocalStorage.getLocalItem(Keys.IS_LOGGED_IN);

  static login = (profile: any, token?: string) => {
    // loggedIn
    CustomLocalStorage.setLocalItem(Keys.IS_LOGGED_IN, true);
    // profile
    CustomLocalStorage.profile(profile);
    // Token
    CustomLocalStorage.token(token);
  };

  static clear = () => {
    localStorage.clear();
  };

  // static setSessionHasExpired = (flag = true) => {
  //   CustomLocalStorage.setLocalItem(
  //     Keys.SESSION_EXPIRED,
  //     flag
  //       ? {
  //           expired: flag,
  //           createdAt: new Date().toISOString(),
  //         }
  //       : null
  //   );
  // };

  // static getSessionHasExpired = () =>
  //   CustomLocalStorage.getLocalItem(Keys.SESSION_EXPIRED);
}
