import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import {rdb} from "../../firebaseInit";

export const userConnection = (uid) => {
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
