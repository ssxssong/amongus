export const actionTypes = {
    POSITIONNING: 'POSITIONNING',
    SET_MYROOM_ID: 'SET_MYROOM_ID',
    DELETE_MYROOM_ID: 'DELETE_MYROOM',
    STORE_NICKNAME: 'STORE_NICKNAME',
    STORE_ROOM_DATA: 'STORE_ROOM_DATA',
    DELETE_ROOM_DATA: 'DELETE_ROOM_DATA',
    DELETE_POSITION: 'DELETE_POSITION',
    SET_LOCATION: 'SET_LOCATION',
    SET_DEFAULT: 'SET_DEFAULT',
    NOTICE_ESCAPING: 'NOTICE_ESCAPING',
    NOTICE_NOT_ESCAPING: 'NOTICE_NOT_ESCAPING',
}


export const actionCreator = {
    store_Position: (position)=> {
        return {type: actionTypes.POSITIONNING, position: position}
    },
    setMyRoomId: (roomId)=> {
        console.log('room id is resistered.');
        return {type: actionTypes.SET_MYROOM_ID, myRoomId: roomId}
    },
    storeNickName: (nickname) => {
        return {type: actionTypes.STORE_NICKNAME, nick:nickname}
    },
    deleteMyRoomId: () => {
        return {type: actionTypes.DELETE_MYROOM_ID}
    },
    storeRoomData: (roomData) => {
        console.log('storing roomData');
        return {type: actionTypes.STORE_ROOM_DATA, roomData: roomData}
    },
    deleteRoomData: () => {
        return {type: actionTypes.DELETE_ROOM_DATA}
    },
    deletePosition: () => {
        return {type: actionTypes.DELETE_POSITION}
    },
    set_location: (location) => {
        return {type: actionTypes.SET_LOCATION, location: location}
    },
    set_default: () => {
        console.log('setting deafault status');
        return {type: actionTypes.SET_DEFAULT}
    },
    notice_escaping: () => {
        return {type: actionTypes.NOTICE_ESCAPING}
    },
    notice_not_escaping: () => {
        return {type: actionTypes.NOTICE_NOT_ESCAPING}
    }
}