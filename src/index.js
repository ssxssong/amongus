import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// hoc
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, rootStore} from "./redux_store/rootStore";
import {Beforeunload} from "react-beforeunload";

import App from './App';

const app = (
    <Provider store={rootStore}>
        <PersistGate loading={null} persistor={persistor}>
                <Beforeunload onBeforeunload={(e) => {}}>
                    <BrowserRouter basename='/'>
                        <App/>
                    </BrowserRouter>
                </Beforeunload>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
