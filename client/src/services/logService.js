/* eslint-disable import/no-anonymous-default-export */
// import Raven from "raven-js";

function init() {
  // Raven configuration
}

function log(error) {
  console.error(error);

  // Error login with Raven
  // Raven.captureException(error)
}

export default {
  init,
  log,
};
