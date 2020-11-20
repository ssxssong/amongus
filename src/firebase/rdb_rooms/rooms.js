import {rdb} from "../firebaseInit";

export const rdb_createRoom = (roomId, uid) => {
    const userStatusDatabaseRef = rdb.ref('/rooms/' + roomId + '/avatars/' + uid);
    userStatusDatabaseRef.set({
        position : {
            x: 50,
            y: 50
        }
    });
}

export const rdb_joinRoom = (roomId, uid) => {
    const userStatusDatabaseRef = rdb.ref('/rooms/' + roomId + '/avatars/' + uid);
    userStatusDatabaseRef.set({
        position : {
            x: 50,
            y: 50
        }
    })
}

export const rdb_leaveRoom = (roomId, uid) => {
    const userStatusDatabaseRef = rdb.ref('/rooms/' + roomId + '/avatars/' + uid);
    userStatusDatabaseRef.remove();
}

export const rdb_update_position = (roomId, uid, position) => {
    const userStatusDatabaseRef = rdb.ref('/rooms/' + roomId + '/avatars/' + uid);
    userStatusDatabaseRef.set({
        position : {
            x: position.x,
            y: position.y
        }
    })
}

export const rdb_room_listener = (roomId, roomDataGetter) => {
    const roomRef = rdb.ref('/rooms/' + roomId);
    roomRef.on('value', (snapshot) => {
            roomDataGetter(snapshot.val());
        });
}