export const actionTypes = {
    STORE_ROOM_LIST: 'STORE_ROOM_LIST',
    SET_DEFAULT: 'SET_DEFAULT',
}

export const actionCreator = {
    store_roomList: (room) => {
        return {type: actionTypes.STORE_ROOM_LIST, room: room}
    },
    set_default: () => {
        return {type: actionTypes.SET_DEFAULT}
    }
}