import {actionTypes} from './actions';

const initialState = {
    roomList: null
};

const reducer = (state = initialState, action) => {
    console.log('rooms reducer');
    switch (action.type) {
        case actionTypes.STORE_ROOM_LIST:
            return {
                ...state,
                roomList: action.room
            }
        default: break;
    }
    return state;
};


export {reducer};