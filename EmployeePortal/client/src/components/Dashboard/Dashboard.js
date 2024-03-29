import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isTokenValid } from "../../api/index";
import * as helper from "../../helper";
import IdleTimerContainer from "../IdleTimerContainer";
import TabsComponent from "./TabsComponent";

export default function Dashboard() {
 
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
      
    </div>
  );
}
