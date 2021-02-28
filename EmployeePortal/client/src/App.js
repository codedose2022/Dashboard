import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { setDetails } from "./actions/employees";
import { isTokenValid } from "./api/index";
import Dashboard from "./components/Dashboard/Dashboard";
import MyProfile from "./components/Employees/Profile/MyProfile";
import ChangePassword from "./components/Login/ChangePassword";
import LoginPage from "./components/Login/LoginPage";
import ResetPassword from "./components/Login/ResetPassword";
import UserContext from "./context/UserContext";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const loggedIn = _.get(state, "employees.loggedInStatus", "");
  const employeeDetail = _.get(state, "employees.employee", "");
  const [employeeData, setEmployeeData] = useState({
    token: "",
    employee: "",
  });

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await isTokenValid(token);
      //if the user is already logged in and token is present in the local storage
      if (tokenRes.data) {
        dispatch(setDetails(token));
        setEmployeeData({
          token,
          employee: employeeDetail,
        });
      }
    };
    checkIfLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          return loggedIn === "loggedIn" ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }}
      />
    );
  }

  return (
    <Router>
      <UserContext.Provider value={{ employeeData, setEmployeeData }}>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/reset/:key">
          <ResetPassword />
        </Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <main>
          <Switch>
            <PrivateRoute exact path="/profile">
              <MyProfile />
            </PrivateRoute>
            <PrivateRoute exact path="/changePassword">
              <ChangePassword />
            </PrivateRoute>
            <PrivateRoute exact path="/:anything">
              Oops! 404 - page not found
            </PrivateRoute>
          </Switch>
        </main>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
