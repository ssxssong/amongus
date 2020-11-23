import {rdb} from "../Init";
import {fs_leaveRoom} from "../firestore/rooms";
import firebase from "firebase/app";
import {AVATARS, ROOMS, STATUS} from "./rooms";

export const rdb_user_connection = (roomId, uid) => {
    const userStatusDatabaseRef = rdb.ref(ROOMS + roomId +'/'+ uid + STATUS );
    const isOfflineForDatabase = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOnlineForDatabase = {
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    rdb.ref('.info/connected')
        .on('value', function(snapshot) {
        if (snapshot.val() === false) {
            return;
        }

        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
            userStatusDatabaseRef.set(isOnlineForDatabase).then();
        });
    });
};



export const rdb_subscribe_usersConnectionData = (roomId, uid, deletePosition) => {
    const statusRef = rdb.ref(ROOMS + roomId +'/'+ uid + STATUS);
    statusRef.on('value', (snapshot) => {
        const users = snapshot.val();
    });
};

export const rdb_unsubscribe_usersConnectionData = () => {
    const statusRef = rdb.ref('/status/users');
    statusRef.off();
}