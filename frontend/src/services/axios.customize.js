import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
    withCredentials: true
});


// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Lấy dữ liệu từ localStorage (Zustand persist)
    const persistedData = localStorage.getItem("access_token");

    let token = null;
    if (persistedData) {
      try {
        const parsed = JSON.parse(persistedData);
        token = parsed?.state?.accessToken || null; // 👈 lấy đúng token
      } catch (e) {
        console.error("❌ Lỗi parse access_token:", e);
      }
    }

    // Thêm header Authorization nếu có token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error && error.response && error.response.data) return error.response.data
    return Promise.reject(error);
});

export default instance