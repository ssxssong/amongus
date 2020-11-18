import {db} from "../firebaseInit";
import firebase from "firebase/app";
import {positionType} from "../../rootStore/status/actions";

const collections = {
    ROOMS: 'ROOMS'
}

export const fs_createRoom = (params, callbacks) => {
    console.log('fs_createRoom', params.user.uid, params.nick, params.user.displayName);
    const users = [{
            uid: params.user.uid,
            nickname: params.nickname,
            displayName: params.user.displayName
        }];
    const data = {
        users: users
        ,
        setting: {
            ...params.setting
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection(collections.ROOMS)
        .add(data)
        .then((docRef)=>{
            callbacks.storeMyRoomId(docRef.id);
            callbacks.go();
        })
        .catch();
}

export const fs_joinRoom = (roomId, params, callback) => {
    const roomRef = db.collection(collections.ROOMS).doc(roomId);
    // get room data
    roomRef.get()
        .then((doc)=>{
            const currentUsers = doc.data().users;
            currentUsers.push({
                uid: params.uid,
                nickname: params.nickname,
                displayName: params.displayName
            });

            // update users
            roomRef.update({
                'users': currentUsers
            }).then(()=>{
                callback();
            }).catch();
        })
        .catch()

}

export const fs_getRoomList = (callback) => {
    db.collection(collections.ROOMS)
        .get()
        .then((querySnapshot)=>{
            const roomList = {};
            querySnapshot.forEach(doc=>{
                roomList[doc.id] = doc.data();
            });
            callback(roomList);
        })
        .catch();
}

export const fs_getRoomData = (roomId, uid, callbacks, ctr) => {
    return db.collection('ROOMS').doc(roomId)
        .onSnapshot((doc)=>{
            console.log('############### onsnapshot running', ctr);
            if (doc.exists) {
                const roomData = doc.data();
                callbacks.storeRoomData(roomData);
                if (roomData.users[0].uid === uid) {
                    callbacks.storePosition(positionType.HOSTING);
                } else {
                    callbacks.storePosition(positionType.JOINING);
                }
            }
        });
}

export const fs_leaveRoom = (roomId, uid, callback) => {
    const roomRef = db.collection(collections.ROOMS).doc(roomId)
    // get current room state
    roomRef.get()
        .then((doc)=>{
            // if leaving user is last person, delete room doc
            if (doc.data().users.length === 1) {
                roomRef.delete()
                    .then(()=>{
                        callback();
                    })
                    .catch();
            }
            // else, keep room doc
            else {
                const updated_users = doc.data().users;
                let index = null;
                updated_users.forEach((userObj)=>{
                    if (userObj.uid === uid) {
                        index = updated_users.indexOf(userObj);
                        console.log('USEROBJ', userObj);
                    }
                });
                updated_users.splice(index, 1);
                roomRef.update({
                    'users': updated_users
                })
                    .then(()=>{
                        callback();
                    })
                    .catch();
            }
        })
        .catch();


}