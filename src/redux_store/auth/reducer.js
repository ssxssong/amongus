import {actionTypes} from './actions';

const initialState = {
    user: null,
    stored: false
};

const reducer = (state = initialState, action) => {
    console.log('auth reducer');
    switch (action.type) {
        case actionTypes.STORE_USER:
            return {
                ...state,
                user: action.user,
                stored: true
            }
        case actionTypes.SET_DEFAULT:
            return {
                ...state,
                user: {
                    uid: null,
                    displayName: null,
                },
                stored: false
            }
        default: break;
    }
    return state;
};


export {reducer};