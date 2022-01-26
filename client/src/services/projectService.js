import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/projects";

export function getProjects() {
  return http.get(apiEndpoint);
}
