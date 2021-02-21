import React, { useEffect, useState } from "react";
import TabsComponent from "./TabsComponent";
import useStyles from "../CommonStyles";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import * as helper from "../../helper";
import { isTokenValid } from "../../api/index";
import { useDispatch } from "react-redux";
import IdleTimerContainer from "../IdleTimerContainer";

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [tokenData, setTokenData] = useState("");
  const state = useSelector((state) => state);
  const isEventsMember = helper.isEventMember(
    _.get(state, "employees.employee.userData.division", "")
  );

  useEffect(() => {
    const checkloggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await isTokenValid(token);
      setTokenData(tokenRes.data);
      if (!tokenRes.data) {
        history.push("/login");
      }
    };
    checkloggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {tokenData && (
        <IdleTimerContainer
          dispatch={dispatch}
          history={history}
        ></IdleTimerContainer>
      )}
      {tokenData && <TabsComponent isEventsMember={isEventsMember} />}
      <div className={classes.topPadding} />
    </div>
  );
}
