/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
// import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // logger.log(error);
    toast.error("An unexpected error occured", { theme: "colored" });
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  //   post: axios.post,
  //   patch: axios.patch,
  //   delete: axios.delete,
};
