import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import Landing from "./pages/landing/landing.component";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import PrivateRoute from "./routing/private-route";
import NotFound from "./pages/not-found/not-found.component";
import Dashboard from "./pages/user-dashboard/user-dashboard.component";
import setAuthToken from "./utils/set-auth-token";
import store from "./redux/store";

import { loadUser } from "./redux/auth/auth.actions";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// **********************************************************************************************************************************
//  JUST FOR THE REFERENCE
// **********************************************************************************************************************************

// import React from "react";
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import { connect } from "react-redux";

// import HomePage from "./pages/homepage/homepage.component";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import ShopPage from "./pages/shop/shop.component";
// import Header from "./components/header/header.component";
// import { setCurrentUser } from "./redux/user/user.actions";

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       currentUser: null,
//     };
//   }

//   componentDidMount() {
//     this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);

//         userRef.onSnapshot((snapShot) => {
//           this.setState({
//             currentUser: {
//               id: snapShot.id,
//               ...snapShot.data(),
//             },
//           });
//         });
//       }

//       this.setState({ currentUser: userAuth });
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribeFromAuth();
//   }

//   render() {
//     return (
//       <div>
//         <Header />
//         <Routes>
//           <Route path="/" element={<HomePage />}></Route>
//           <Route path="/shop" element={<ShopPage />}></Route>
//           <Route path="/signin" element={<SignInAndSignUpPage />}></Route>
//         </Routes>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

// export default connect(null, mapDispatchToProps)(App);
