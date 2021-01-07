import React from 'react';
import ReactDOM from 'react-dom';
/*keep track of the store and access state from anywhere*/
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import reducers from './reducers';

import App from './App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

