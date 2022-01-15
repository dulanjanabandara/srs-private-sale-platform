import { combineReducers } from "redux";

import alertReducer from "./alert/alert.reducer";
import authReducer from "./auth/auth.reducer";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
});

// -------------------------------------------------------
// import { combineReducers } from "redux";

// import userReducer from "./user/user.reducer";

// export default combineReducers({
//   user: userReducer,
// });
