import {db} from "../Init";
import firebase from "firebase/app";
import 'firebase/auth';

const collections = {
    ROOMS: 'ROOMS'
}

export const fs_createRoom = async (data) => {
    const updatedData = data
    updatedData['createdAt'] = firebase.firestore.FieldValue.serverTimestamp()
    const docRef = await db.collection(collections.ROOMS).add(updatedData)
    return docRef.id
}

export const fs_getRoomList = async () => {
    const querySnapshot =  await db.collection(collections.ROOMS).get()
    const roomList = {};
    querySnapshot.forEach(doc=>{
        roomList[doc.id] = doc.data();
    });
    return roomList
}

export const fs_getRoomData = async (roomId) => {
    const roomRef = db.collection(collections.ROOMS).doc(roomId);
    return await roomRef.get()
}

export const fs_updateRoomData_user = (roomId, updatedUser) => {
    return new Promise((resolve, reject) => {
        const roomRef = db.collection(collections.ROOMS).doc(roomId)
        roomRef.update({
            users: updatedUser
        }).then(()=>{
            resolve(`JOIN : updated my data to fs_room_${roomId}.`)
        }).catch((err)=>{
            reject(err)
        })
    })
}


export const fs_deleteRoomDoc = (roomId) => {
    return new Promise((resolve, reject)=>{
        const roomRef = db.collection(collections.ROOMS).doc(roomId)
        roomRef.delete().then(()=>{
            resolve('Room doc successfully deleted.')
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const fs_onRoomData = (roomId, observer) => {
    return db.collection(collections.ROOMS).doc(roomId)
        .onSnapshot(observer)
}

export const fs_delete_all = async () => {
    return db.collection(collections.ROOMS).get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                doc.ref.delete();
            })
        })
}