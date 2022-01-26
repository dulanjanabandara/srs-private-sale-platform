import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function login(email, password) {
  return http.post(apiEndpoint + "/login", {
    email,
    password,
  });
}
