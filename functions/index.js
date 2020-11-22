const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const fs = admin.firestore();


exports.TestFunc = functions.database.ref('/rooms/{roomId}/status/{uid}/')
    .onUpdate((change, context)=> {
        if (change.after.val().state === 'offline') {
            const t_triggered = change.after.val().last_changed;
            const ref = change.after.ref;
            const uid = context.params.uid;
            const roomId = context.params.roomId;
            setTimeout(()=>{
                ref.once('value')
                    .then((snapshot) => {
                        let result;
                        if (snapshot.val().state === 'offline') {
                            const T_toCheck = snapshot.val().last_changed;
                            const T_criterion = Date.now();
                            result = T_criterion - T_toCheck > 15000 ? 'USER_EXIT' : 'RE_TRIGGERED';
                        } else {
                            result = 'USER_RELOADED';
                        }

                        return result;
                    })
                    .then((result)=>{
                        console.log('RESULT', result);
                        if (result === 'USER_EXIT') {
                            // console.log('ref.parent', ref.parent.toJSON()); // status
                            // console.log('ref.parent.parent', ref.parent.parent.toJSON()); // roomId

                            // remove user from fs room
                            return fs.collection('ROOMS').doc(roomId).get()
                        } else {
                            console.log('THROWING ERR')
                            throw new Error('user not exited.');
                        }
                    })
                    .then((doc) => {
                        console.log('##### deleting FS room');
                        if (doc.exists) {
                            const users = doc.data().users;
                            let indexToDelete = null;
                            users.forEach((user, i) => {
                                if (user.uid === uid) {
                                    indexToDelete = i;
                                }
                            });
                            users.splice(indexToDelete, 1);
                            return fs.collection('ROOMS').doc(roomId).update({users: users})
                        } else {
                            throw new Error('???')
                        }
                    })
                    .then(()=>{
                        console.log('deleting FS room #####');
                        // remove user from rdb room
                        console.log('##### deleting rdb room');
                        return ref.parent.parent.child('avatars').child(uid).remove()
                    })
                    .then((res)=>{
                        console.log('deleting rdb room #####');
                        return 'SUCCESS';
                    })
                    .then((res)=>{
                        console.log(res);
                        return null;
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
            }, 15000);
        } else {
            return null;
        }
    })