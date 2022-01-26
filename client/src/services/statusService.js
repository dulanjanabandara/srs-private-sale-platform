import http from "./httpService";
import config from "../config.json";

export function getStatuses() {
  return http.get(config.apiUrl + "/statuses");
}
