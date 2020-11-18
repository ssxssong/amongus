export const actionTypes = {
    STORE_ROOM_LIST: 'STORE_ROOM_LIST'
}

export const actionCreator = {
    store_roomList: (room) => {
        return {type: actionTypes.STORE_ROOM_LIST, room: room}
    }
}