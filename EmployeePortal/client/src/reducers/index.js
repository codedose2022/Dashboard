import { combineReducers } from "redux";
import employees from "./employees";
import events from "./events";

const appReducer = combineReducers({
  employees,
  events,
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
