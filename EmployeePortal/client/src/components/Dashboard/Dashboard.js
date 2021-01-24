import React from "react";
import TabsComponent from "./TabsComponent";
import useStyles from "../CommonStyles";
import { useSelector } from "react-redux";
import _ from "lodash";
import * as helper from "../../helper";

export default function Dashboard() {
  const classes = useStyles();
   const state = useSelector((state) => state);
    const isEventsMember = helper.isEventMember(
    _.get(state, "employees.employee.userData.division", "")
  );
  
  return (
    <div>
   <div className={classes.topPadding} />
      <TabsComponent isEventsMember= {isEventsMember} />
    </div>
  );
}
