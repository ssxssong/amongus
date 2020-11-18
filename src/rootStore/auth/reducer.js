import {actionTypes} from './actions';

const initialState = {
    user: null,
    stored: false
};

const reducer = (state = initialState, action) => {
    console.log('auth reducer');
    switch (action.type) {
        case actionTypes.SIGN_IN:
            return {
                ...state,
                user: action.user,
                stored: true
            }
        default: break;
    }
    return state;
};


export {reducer};