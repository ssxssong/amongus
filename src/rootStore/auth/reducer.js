import {actionTypes} from './actions';

const initialState = {
    user: {
        uid: null,
        displayName: null,
    },
    stored: false
};

const reducer = (state = initialState, action) => {
    console.log('auth reducer');
    switch (action.type) {
        case actionTypes.SIGN_IN:
            const updatedUser = {uid: action.user.uid, displayName: action.user.displayName};

            return {
                ...state,
                user: updatedUser,
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