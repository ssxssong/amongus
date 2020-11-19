import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {persistor, store} from "./rootStore/store";
import {PersistGate} from "redux-persist/integration/react";

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename='/'>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
