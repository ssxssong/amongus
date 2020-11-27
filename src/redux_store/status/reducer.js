import {actionTypes} from './actions';
import {locationType, positionType} from "../../const/const";

const initialState = {
    locatedAt: locationType.HOME,
    nickname: '',
    myRoomId: null,
    position: positionType.WAITING,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DEFAULT:
            return {
                ...initialState
            }
        case actionTypes.SET_LOCATION:
            return {
                ...state,
                locatedAt: action.location
            }
        case actionTypes.STORE_NICKNAME:
            return {
                ...state,
                nickname: action.nick
            }
        case actionTypes.STORE_MYROOMID:
            return {
                ...state,
                myRoomId: action.myRoomId
            }
        case actionTypes.STORE_POSITION:
            return {
                ...state,
                position: action.position
            }
        case actionTypes.STORE_ROOMDATA:
            return {
                ...state,
                roomData: action.roomData
            }
        default: break;
    }
    return state;
};


export {reducer};