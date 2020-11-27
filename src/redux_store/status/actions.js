export const actionTypes = {
    SET_LOCATION: 'SET_LOCATION',
    STORE_NICKNAME: 'STORE_NICKNAME',
    SET_DEFAULT: 'SET_DEFAULT',
    STORE_MYROOMID: 'STORE_MYROOMID',
    STORE_POSITION: 'STORE_POSITION',
    STORE_ROOMDATA: 'STORE_ROOMDATA',
};

export const actionCreator = {
    set_default: () => {
        return {type: actionTypes.SET_DEFAULT}
    },
    set_location: (location) => {
        return {type: actionTypes.SET_LOCATION, location: location}
    },
    store_nickName: (nickname) => {
        return {type: actionTypes.STORE_NICKNAME, nick: nickname}
    },
    store_myRoomId: (myRoomId) => {
        return {type: actionTypes.STORE_MYROOMID, myRoomId: myRoomId}
    },
    store_position: (position)=> {
        return {type: actionTypes.STORE_POSITION, position: position}
    },
    store_roomData: (roomData) => {
        return {type: actionTypes.STORE_ROOMDATA, roomData: roomData}
    },
}