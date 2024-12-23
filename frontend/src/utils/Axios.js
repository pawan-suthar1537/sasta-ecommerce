import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;

const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// seding access token in header
Axios.interceptors.request.use(
  async (config) => {
    const accesstoken = localStorage.getItem("accesstoken");

    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// extend access token help of refreshtoken

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalrequest = error.config;

    if (error.response.status === 403 && !originalrequest.retry) {
      originalrequest.retry = true;
      const refreshtoken = localStorage.getItem("refreshtoken");
      if (refreshtoken) {
        const res = await refreshaccesstoken(refreshtoken);
        if (res) {
          originalrequest.headers.Authorization = `Bearer ${res}`;
          return Axios(originalrequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshaccesstoken = async (refreshtoken) => {
  try {
    const res = Axios({
      method: "POST",
      url: "/api/user/refreshAccessToken",
      data: {
        refreshtoken,
      },
      headers: {
        Authorization: `Bearer ${refreshtoken}`,
      },
    });

    const accesstoken = res.data.data.newaccessToken;
    localStorage.setItem("accesstoken", accesstoken);
    return accesstoken;
  } catch (error) {
    console.log("error while refreshing token", error);
  }
};

export default Axios;
