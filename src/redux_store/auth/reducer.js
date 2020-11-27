import {actionTypes} from './actions';

const initialState = {
    user: null,
    loggedIn: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_USER:
            return {
                ...state,
                user: action.user,
            }
        case actionTypes.SET_LOGGEDIN:
            return {
                ...state,
                loggedIn: true
            }
        case actionTypes.SET_DEFAULT:
            return initialState

        default:break;
    }
    return state;
};

export {reducer};