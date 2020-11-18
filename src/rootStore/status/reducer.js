import {actionTypes} from './actions';
import {locationType} from "../../constants/constatns";

const initialState = {
    position: null,
    nickname: '',
    myRoomId: null,
    roomData: null,
    located: null
};

const reducer = (state = initialState, action) => {
    console.log('status reducer');
    switch (action.type) {
        case actionTypes.POSITIONNING:
            return {
                ...state,
                position: action.position
            }
        case actionTypes.SET_MYROOM_ID:
            return {
                ...state,
                myRoomId: action.myRoomId
            }
        case actionTypes.DELETE_MYROOM_ID:
            return {
                ...state,
                myRoomId: null
            }
        case actionTypes.STORE_NICKNAME:
            return {
                ...state,
                nickname: action.nick
            }
        case actionTypes.STORE_ROOM_DATA:
            return {
                ...state,
                roomData: action.roomData
            }
        case actionTypes.DELETE_ROOM_DATA:
            return {
                ...state,
                roomData: null
            }
        case actionTypes.DELETE_POSITION:
            return {
                ...state,
                position: null
            }
        case actionTypes.SET_LOCATION:
            return {
                ...state,
                located: action.location
            }
        case actionTypes.SET_DEFAULT:
            return {
                ...state,
                position: null,
                nickname: '',
                myRoomId: null,
                roomData: null,
                located: null
            }
        default: break;
    }
    return state;
};


export {reducer};