import {actionTypes} from './actions';

const initialState = {
    user: null,
    stored: false,
    trying: false
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
        case actionTypes.TRYING:
            return {
                ...state,
                trying: true
            }
        case actionTypes.FAILED:
            return {
                ...state,
                trying: false
            }
        case actionTypes.SET_DEFAULT:
            console.log('reducer: setting auth default')
            return {
                ...state,
                user: null,
                stored: false,
                trying: false
            }
        default: break;
    }
    return state;
};


export {reducer};