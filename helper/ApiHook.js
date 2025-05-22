import axios from "axios";
import swal from "sweetalert";
import { getSession, signOut } from "next-auth/react";

// get data from server
export const get = async (url) => {
  let isLoading = true;
  const session = await getSession();
  const token = session?.accessToken;

  try {
    const response = await axios.get(url, {
      headers: {
        "x-access-token": token,
        accept: "application/json",
        platform: "web",
        version: "1.0.0",
        timezone: "asia/kolkata",
      },
    });
    if (response?.data?.code === 401) {
      await handleSessionExpiry();
    }

    isLoading = false;
    return {
      data: response.data,
      error: null,
      isLoading: isLoading,
      code: response.data,
    };
  } catch (error) {
    isLoading = false;
    const axiosError = error;

    if (axiosError?.response?.status == 401) {
      await handleSessionExpiry();
    }
    if (axiosError?.response?.status == 401) {
      window.location.href = "/login";
    }
    return {
      code: axiosError?.response ?? null,
      data: null,
      error: axiosError?.response,
      isLoading: isLoading,
    };
  }
};

// post data to server
export const post = async (url, body) => {
  let isLoading = true;

  const session = await getSession();
  const token = session?.accessToken;
  try {
    const response = await axios.post(url, body, {
      headers: {
        "x-access-token": token,
        accept: "application/json",
        platform: "web",
        version: "1.0.0",
        timezone: "asia/kolkata",
      },
    });

    if (response?.data?.code == 401) {
      swal("Session expired", "", "error").then(() => {
        signOut({ callbackUrl: "/login" });
      });
    }
    return {
      data: response?.data,
      error: null,
      isLoading: isLoading,
      code: response.data?.code,
    };
  } catch (error) {
    const axiosError = error;
    isLoading = false;

    if (axiosError?.response?.status == 401) {
      swal("Session expired", "", "error").then(() => {
        signOut({ callbackUrl: "/login" });
      });

      return {
        code: axiosError?.response?.status,
        data: null,
        error: "Session expired,please login again",
        isLoading: isLoading,
      };
    } else {
      return {
        code: axiosError?.response?.status,
        data: null,
        error:
          axiosError?.response?.status == 401
            ? "Session expired,please login again"
            : axiosError?.response?.data?.message || "Something went wrong",
        isLoading: isLoading,
      };
    }
  }
};

// delete data from server
export const Delete = async (url) => {
  let isLoading = true;
  const session = await getSession();
  const token = session?.accessToken;

  try {
    const response = await axios.delete(url, {
      headers: {
        "x-access-token": token,
        accept: "application/json",
        platform: "web",
        version: "1.0.0",
        timezone: "asia/kolkata",
      },
    });
    isLoading = false;
    if (response?.data?.code == 401) {
      swal("Session expired", "", "error");
      await signOut({ redirect: true, callbackUrl: "/login" });
    }

    return {
      data: response?.data,
      error: null,
      isLoading: isLoading,
      code: response.data?.code,
    };
  } catch (error) {
    const axiosError = error;
    isLoading = false;

    if (axiosError?.response?.status == 401) {
      await signOut({ redirect: true, callbackUrl: "/login" });

      return {
        code: axiosError?.response?.status,
        data: null,
        error: "Session expired,please login again",
        isLoading: isLoading,
      };
    } else {
      return {
        code: axiosError?.response?.status,
        data: null,
        error:
          axiosError?.response?.status == 401
            ? "Session expired,please login again"
            : axiosError?.response?.data?.message || "Something went wrong",
        isLoading: isLoading,
      };
    }
  }
};

// update data from server
export const update = async (url, body) => {
  let isLoading = true;
  const session = await getSession();
  const token = session?.accessToken;

  try {
    const response = await axios.put(url, body, {
      headers: {
        "x-access-token": token,
        accept: "application/json",
        platform: "web",
        version: "1.0.0",
        timezone: "asia/kolkata",
      },
    });
    isLoading = false;
    if (response?.status == 401) {
      swal("Session expired", "", "error").then(async () => {
        await signOut({ redirect: true, callbackUrl: "/login" });
      });
    }
    return {
      data: response?.data,
      error: null,
      isLoading: isLoading,
      code: response.data?.code,
    };
  } catch (error) {
    const axiosError = error;
    isLoading = false;

    if (axiosError?.response?.status == 401) {
      swal("Session expired", "", "error").then(async () => {
        await signOut({ redirect: true, callbackUrl: "/login" });
      });

      return {
        code: axiosError?.response?.status,
        data: null,
        error: "Session expired,please login again",
        isLoading: isLoading,
      };
    } else {
      return {
        code: axiosError?.response?.status,
        data: null,
        error:
          axiosError?.response?.status == 401
            ? "Session expired,please login again"
            : axiosError?.response?.data?.message || "Something went wrong",
        isLoading: isLoading,
      };
    }
  }
};

//clear the next auth session data
const handleSessionExpiry = async () => {
  swal("Session expired", "", "error").finally(async () => {
    const callbackUrl = "/login";
    await signOut({ redirect: true, callbackUrl: callbackUrl });
  });
};