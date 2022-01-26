import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const loginPromise = await http.post(apiEndpoint + "/login", {
    email,
    password,
  });
  const jwt = loginPromise.headers["x-auth-token"];
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
