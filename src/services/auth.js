import config from "../config";
import { toast } from "react-toastify";

export const logout = async () => {
  try {
    const response = await fetch(`${config.apiUrl}logout`, {
      method: "POST",
      credentials: "include"
    });
    if (response.status === 200) {
      return null;
    } else {
      throw new Error("Could not log out user. Please try again.");
    }
  } catch (error) {
    throw new Error("Server error: ", error);
  }
};

export const validateUser = async () => {
  try {
    const response = await fetch(config.apiUrl + "user", {
      credentials: "include"
    });
    if (response.status !== 200) {
      return null;
    } else {
      const user = await response.json();
      return user;
    }
  } catch (error) {
    throw new Error("Server error: ", error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${config.apiUrl}login`, {
      method: "POST",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password.trim()
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const user = await response.json();
    if (response.status !== 200) {
      toast.error(user.message);
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("network error: ", error);
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${config.apiUrl}register`, {
      method: "POST",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password.trim()
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const user = await response.json();
    if (response.status !== 200) {
      toast.error(user.message);
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("network error: ", error);
  }
};
