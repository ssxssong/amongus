import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer as authReducer} from './auth/reducer';
import {reducer as roomsReducer} from './rooms/reducer';
import {reducer as statusReducer} from "./status/reducer";
import {reducer as callReducer} from "./call/reducer";
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
    // blacklist: ['auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
    status: statusReducer,
    call: callReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

export {persistor, store}
