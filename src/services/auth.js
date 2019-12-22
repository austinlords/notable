import { apiUrl } from "../config";
import { httpGet, httpPost } from "../services/httpService";

export const logout = async () => {
  const response = await httpPost(apiUrl + "logout");
  localStorage.removeItem("notable-token");
  return response.message;
};

export const validateUser = async () => {
  const response = await httpGet(apiUrl + "user");
  if (response.error) return null;
  return response;
};

export const login = async (email, password) => {
  const response = await httpPost(
    apiUrl + "login",
    JSON.stringify({
      email: email.trim().toLowerCase(),
      password: password.trim()
    })
  );

  if (response.error) {
    throw new Error(response.message);
  }

  return response;
};

export const register = async (email, password) => {
  const response = await httpPost(
    apiUrl + "register",
    JSON.stringify({
      email: email.trim().toLowerCase(),
      password: password.trim()
    })
  );

  if (response.error) {
    throw new Error(response.message);
  }

  return response;
};
