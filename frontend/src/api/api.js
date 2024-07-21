import axios from "axios";
import { logoutThunk } from "../redux/features/auth/authSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutThunk());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
