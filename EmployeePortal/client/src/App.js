import React, { useEffect, useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MyProfile from "./components/Employees/Profile/MyProfile";
import _ from "lodash";
import UserContext from "./context/UserContext";
import { isTokenValid } from "./api/index";
import ChangePassword from "./components/Login/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "./actions/employees";

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
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route exact path='/login' component={LoginPage}></Route>
        <main>
          <Switch>
            <PrivateRoute exact path='/profile'>
              <MyProfile />
            </PrivateRoute>
            <PrivateRoute exact path='/changePassword'>
              <ChangePassword />
            </PrivateRoute>
          </Switch>
        </main>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
