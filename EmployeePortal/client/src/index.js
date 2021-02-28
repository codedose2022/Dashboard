import React from "react";
import ReactDOM from "react-dom";
/*keep track of the store and access state from anywhere*/
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import reducers from "./reducers";
import {
  loadFromLocalStorage, saveToLocalStorage
} from "./reducers/ConfigStore";


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
