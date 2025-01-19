// import axios from "axios";

// const API_URL = import.meta.env.VITE_BACK_URL;

// const Axios = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// // seding access token in header
// Axios.interceptors.request.use(
//   async (config) => {
//     const accesstoken = localStorage.getItem("accesstoken");

//     if (accesstoken) {
//       config.headers.Authorization = `Bearer ${accesstoken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // extend access token help of refreshtoken

// Axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     let originalrequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 403 &&
//       !originalrequest.retry
//     ) {
//       originalrequest.retry = true;
//       const refreshtoken = localStorage.getItem("refreshtoken");
//       if (refreshtoken) {
//         const res = await refreshaccesstoken(refreshtoken);
//         if (res) {
//           originalrequest.headers.Authorization = `Bearer ${res}`;
//           return Axios(originalrequest);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// const refreshaccesstoken = async (refreshtoken) => {
//   try {
//     const res = Axios({
//       method: "POST",
//       url: "/api/user/refreshAccessToken",
//       data: {
//         refreshtoken,
//       },
//       headers: {
//         Authorization: `Bearer ${refreshtoken}`,
//       },
//     });

//     const accesstoken = res.data.data.newaccessToken;
//     localStorage.setItem("accesstoken", accesstoken);
//     return accesstoken;
//   } catch (error) {
//     console.log("error while refreshing token", error);
//   }
// };

// export default Axios;

import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;

const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

// Add Request Interceptor to Attach Access Token
Axios.interceptors.request.use(
  (config) => {
    // Retrieve the access token from localStorage
    const accesstoken = localStorage.getItem("accesstoken");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`; // Add access token to the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add Response Interceptor to Handle Token Expiry and Refresh
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (HTTP 403 or other status codes)
    if (
      error.response &&
      error.response.status === 403 && // Adjust based on your backend's expired token response status
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Retrieve the refresh token from localStorage
      const refreshtoken = localStorage.getItem("refreshtoken");
      if (refreshtoken) {
        try {
          // Make an API call to refresh the access token
          const res = await Axios.post("/api/user/refreshAccessToken", {
            refreshtoken,
          });

          const newAccessToken = res.data.data.newaccessToken;

          // Store the new access token in localStorage
          localStorage.setItem("accesstoken", newAccessToken);

          // Update the Authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return Axios(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);
          // Optional: Log out the user if refresh token fails
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
