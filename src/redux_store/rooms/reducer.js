import {actionTypes} from './actions';

const initialState = {
    roomList: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ROOM_LIST:
            return {
                ...state,
                roomList: action.roomList
            }
        case actionTypes.SET_DEFAULT:
            return {
                ...initialState
            }
        default: break;
    }
    return state;
};


export {reducer};