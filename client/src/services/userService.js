import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(
    apiEndpoint + "/signup",
    {
      username: user.username,
      email: user.email,
      discordName: user.discordName,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
    }
    // { withCredentials: true }
  );
}

export function getMe() {
  return http.get(`${apiEndpoint}/me`);
}

export function getMyProjects(userId) {
  return http.get(`${apiEndpoint}/${userId}/view-projects`);
}
