import { apiUrl } from "../config";
import { httpGet, httpPost } from "../services/httpService";

export const logout = async () => {
  const response = await httpPost(apiUrl + "logout");
  localStorage.removeItem("notable-token");
  return response.message;
};

export const validateUser = async () => {
  const user = await httpGet(apiUrl + "user");
  if (user.error) return null;
  return user;
};

export const login = async (email, password) => {
  const user = await httpPost(
    apiUrl + "login",
    JSON.stringify({
      email: email.trim().toLowerCase(),
      password: password.trim()
    })
  );
  return user;
};

export const register = async (email, password) => {
  const user = await httpPost(
    apiUrl + "register",
    JSON.stringify({
      email: email.trim().toLowerCase(),
      password: password.trim()
    })
  );

  return user;
};
