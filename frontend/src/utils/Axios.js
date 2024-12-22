import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL;

const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default Axios;
