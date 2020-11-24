const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const fs = admin.firestore();
const userConnectionTypes = {
    ONLINE: 'online',
    OFFLINE: 'offline'
}
const userStateTypes = {
    EXIT: 'EXIT',
    RELOADED: 'RELOADED',
    RE_TRIGGERED: 'RE_TRIGGERED'
}

const getUserState = async (ref)=> {
    const snapshot = await ref.once('value');
    let userState = null;
    if (snapshot.val().state === userConnectionTypes.OFFLINE) {
        const T_toCheck = snapshot.val().last_changed;
        const T_criterion = Date.now();
        userState = T_criterion - T_toCheck > 15000 ?
            userStateTypes.EXIT :
            userStateTypes.RE_TRIGGERED;
    } else if (snapshot.val().state === userConnectionTypes.ONLINE) {
        userState = userStateTypes.RELOADED;
    }
    return userState;
}

const findUserFromFirestore = async (roomId, uid) => {
    const doc = await fs.collection('ROOMS').doc(roomId).get();
    let updatedUsers = null;
    if (doc.exists) {
        const users = doc.data().users;
        let indexToDelete = null;
        users.forEach((user, i) => {
            if (user.uid === uid) {
                indexToDelete = i;
            }
        });
        users.splice(indexToDelete, 1);
        updatedUsers = users;
    } else throw new Error("doc does not exist.");

    return updatedUsers;
}


const removeUserFromRealtimeDB = async (ref) => {
    return ref.parent.remove().then(()=>console.log('[removeUserFromRealtimeDB] success')).catch('[removeUserFromRealtimeDB]_err');
}

const deleteUser = (uid) => {
}

const after15sec = async (ref, roomId, uid) => {
    const userState = await getUserState(ref);
    if (userState === null || userState === undefined) {
        throw new Error(`userState : ${userState}`);
    } else if (userState === userStateTypes.EXIT) {
        console.log('## ref.parent',ref.parent,'ref.parent ##');
        const remove_from_rdb = await ref.parent.remove();
        const updatedUsers = await findUserFromFirestore(roomId, uid);
        const remove_from_fs = await fs.collection('ROOMS').doc(roomId).update({users: updatedUsers});
        const delete_User = await admin.auth().deleteUser(uid);
        console.log('## remove_from_rdb', remove_from_rdb , 'remove_from_rdb ##');
        console.log('## remove_from_fs', remove_from_fs , 'remove_from_fs ##');
        console.log('## delete_User_from_auth', delete_User , 'delete_User_from_auth ##');

    } else {
        console.log('Do nothing',userState);
    }
}


const manageRoom = (change, context) => {
    if (change.after.val().state === 'offline') {
        const ref = change.after.ref;
        const uid = context.params.uid;
        const roomId = context.params.roomId;
        setTimeout(()=>{
            after15sec(ref, roomId, uid)
                .then((r)=>console.log("done", r))
                .catch((err)=>console.log("###### error", err, "error ######"));
        }, 15000);
    } else {
        console.log("DO NOTHING: User is 'online'");
    }
};





exports.watch_UserDisconnection = functions.database.ref('/rooms/{roomId}/{uid}/status')
    .onUpdate(manageRoom);