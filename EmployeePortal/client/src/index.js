import React from "react";
import ReactDOM from "react-dom";
/*keep track of the store and access state from anywhere*/
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.css";
import reducers from "./reducers";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./reducers/ConfigStore";

import App from "./App";

/*storing state in local storage and also updating the same with state change*/
const persistedState = loadFromLocalStorage();
const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
