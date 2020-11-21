import {rdb} from "../Init";
import {fs_leaveRoom} from "../firestore/rooms";
import firebase from "firebase/app";

export const rdb_user_connection = (uid) => {
    const userStatusDatabaseRef = rdb.ref('/status/users/' + uid);
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

export const rdb_subscribe_usersConnectionData = (roomId, deletePosition) => {
    const statusRef = rdb.ref('/status/users');
    statusRef.on('value', (snapshot) => {
        const users = snapshot.val();

        // if a user disconnected over 30sec, delete user data
        Object.keys(users).forEach((user) => {
            if (users[user].state === 'offline') {
                console.log(user);
                const tempTimestampRef = rdb.ref('/tempTimestamp')
                tempTimestampRef.set(
                    firebase.database.ServerValue.TIMESTAMP, () => {
                        tempTimestampRef.once('value').then((s) => {
                            if ((s.val() - users[user].last_changed - 30000) > 0) {
                                rdb.ref('/rooms/' + roomId + '/avatars/' + user)
                                    .remove().then();
                                fs_leaveRoom(roomId, user, {
                                    deletePosition: deletePosition,
                                    go: () => {}
                                })
                            }
                        });
                    });
            }
        });
    });
};

export const rdb_unsubscribe_usersConnectionData = () => {
    const statusRef = rdb.ref('/status/users');
    statusRef.off();
}