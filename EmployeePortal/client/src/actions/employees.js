import _ from "lodash";
import * as api from "../api";
import { getEvents } from "./events";
import { getPolls } from "./polls";

export const login = (loginData, callback) => async (dispatch) => {
  try {
    const { data } = await api.login(loginData);
    const loginStatus = _.get(data, "messages.status", "");

    if (loginStatus === "11") {
      dispatch({ type: "LOGIN", payload: data });
      let token = localStorage.getItem("auth-token");
      if (token === "") {
        token = _.get(data, "token", "");
        localStorage.setItem("auth-token", token);
      }
      dispatch({ type: "LOGIN_STATUS", payload: "loggedIn" });
      dispatch(getEmployeesDetails(token));
      dispatch(getEvents(token, _.get(data, "userData.division", "")));
      dispatch(getPolls(token));
    } else {
      callback(_.get(data, "messages.message", ""));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.getProfile(token);
    dispatch({ type: "GET_PROFILE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const isTokenValid = (token) => async () => {
  try {
    const isValid = await api.isTokenValid(token);
    return isValid;
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployeesDetails = (token) => async (dispatch) => {
  try {
    const { data } = await api.getEmployees(token);
    dispatch({ type: "GET_EMPLOYEES", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//if token is already present
export const setDetails = (token) => async (dispatch) => {
  try {
    const { data } = await api.getUserData(token);
    dispatch({ type: "LOGIN", payload: data });
    dispatch({ type: "LOGIN_STATUS", payload: "loggedIn" });
    dispatch(getEmployeesDetails(token));
    dispatch(getEvents(token, _.get(data, "userData.division", "")));
    dispatch(getPolls(token));
  } catch (error) {
    console.log(error.message);
  }
};
