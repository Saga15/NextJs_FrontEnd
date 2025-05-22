class Api {
  static readonly baseUrl: string | undefined = Api.getBaseUrl();

  // static readonly loginUrl = `${Api.baseUrl}admin/login`;
  static readonly forgotPasswordUrl = `${Api.baseUrl}/auth/forgot-password`;
  static readonly verifyTokenUrl = `${Api.baseUrl}/auth/verify-token`;
  static readonly resetPasswordUrl = `${Api.baseUrl}/auth/reset-password`;
  static readonly authUrl = `${Api.baseUrl}auth/`;
  static readonly signUpUrl = `${Api.baseUrl}/users`;
  static readonly candleStickDataUrl = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=demo`;
  


  // Get base URL of APIs
  private static getBaseUrl(): string | undefined {
    const environment: string = process.env.NODE_ENV || "development";

    if (environment === "development") {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    return undefined;
  }
}

export default Api;
