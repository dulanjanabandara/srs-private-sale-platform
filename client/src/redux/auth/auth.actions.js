import axios from "axios";
import { setAlert } from "../alert/alert.actions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../action-types";
import setAuthToken from "../../utils/set-auth-token";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // const res = await axios.get("http://localhost:5000/users/auth");
    const res = await axios.get("/api/v1/users");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ username, email, discordName, password, confirmPassword }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      username,
      email,
      discordName,
      password,
      confirmPassword,
    });

    try {
      const res = await axios.post("/api/v1/users/signup", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/users/", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// ------------------------------------------------------------------
// JONAS FRONT-END CODE
// ------------------------------------------------------------------
// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: "http://127.0.0.1:3000/api/v1/users/logout",
//     });

//     if ((res.data.status = "success")) {
//       location.reload(true);
//     }
//   } catch (err) {
//     showError("error", "Error logging out! Try again");
//   }
// };
