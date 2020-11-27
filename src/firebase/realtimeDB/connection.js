import {rdb} from "../Init";
import firebase from "firebase/app";
import {LOBBY, USERS, STATUS} from "./rooms";

export const connectionType = {
    online: 'online',
    offline: 'offline'
}

export const rdb_sub_user_connection = (roomId, uid) => {
    const userStatusDatabaseRef = rdb.ref(LOBBY + roomId + USERS + uid + STATUS );
    const isOfflineForDatabase = {
        state: connectionType.offline,
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOnlineForDatabase = {
        state: connectionType.online,
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    return rdb.ref('.info/connected')
        .on('value', function(snapshot) {
        if (snapshot.val() === false) {
            return;
        }

        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
            userStatusDatabaseRef.set(isOnlineForDatabase).then();
        });
    });
};


export const rdb_unsub_user_connection = () => {
    return rdb.ref('.info/connected').off()
}
