import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/projects";

function projectUrl(projectId) {
  return `${apiEndpoint}/${projectId}`;
}

export function getProjects() {
  return http.get(apiEndpoint);
}

export function getProject(projectId) {
  return http.get(projectUrl(projectId));
}

export async function joinProject(
  projectId,
  contributionAmount,
  contributingWallet,
  transactionLink
) {
  await http.post(`${apiEndpoint}/${projectId}/join-project`, {
    contributionAmount,
    contributingWallet,
    transactionLink,
  });
}
