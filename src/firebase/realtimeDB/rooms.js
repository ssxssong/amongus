import {rdb} from "../Init";
import firebase from "firebase";

export const ROOMS = '/rooms/';
export const AVATARS = '/avatars/';
export const POSITION = '/position/';
export const STATUS = '/status/';

export const rdb_createRoom = (roomId, uid) => {
    const avatarRef = rdb.ref(ROOMS + roomId + AVATARS + uid);
    avatarRef.set({
        position : {
            x: 50,
            y: 50
        }
    });
}

export const rdb_joinRoom = (roomId, uid, callback) => {
    const userStatusDatabaseRef = rdb.ref(ROOMS + roomId + AVATARS + uid);
    userStatusDatabaseRef.set({
        position: {
            x: 50,
            y: 50
        }
    }).then(()=>callback && callback());
}

export const rdb_leaveRoom = (roomId, uid) => {
    const userStatusDatabaseRef = rdb.ref(ROOMS + roomId + AVATARS + uid);
    userStatusDatabaseRef.remove();
}

export const rdb_update_position = (roomId, uid, position) => {
    const userStatusDatabaseRef = rdb.ref(ROOMS + roomId + AVATARS + uid + POSITION);
    userStatusDatabaseRef.set({
        x: position.x,
        y: position.y
    });
}

export const rdb_room_listener = (roomId, roomDataGetter) => {
    const roomRef = rdb.ref(ROOMS + roomId);
    roomRef.on('value', (snapshot) => {
        roomDataGetter(snapshot.val());
    });
}


export const rdb_subscribe_roomData = (roomId, callback) => {
    if (roomId !== '') {
        const roomRef = rdb.ref(ROOMS + roomId);
        roomRef.on('value', (snapshot) => {
            callback({...snapshot.val()});
        });
    }
};

export const rdb_unsubscribe_roomData = (roomId) => {
    const roomRef = rdb.ref(ROOMS + roomId);
    roomRef.off();
}