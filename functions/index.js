const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.deleteAvatar = functions.database.ref('/status/users/')
    .onUpdate((change, context)=>{
      const users = change.after.val();
      Object.keys(users).map((user) => {
        if (users[user].state === 'offline') {
          if (admin.database.ServerValue.TIMESTAMP - users[user].last_changed > 0) {
            const roomsRef = change.after.ref.parent.parent.child
            Object.keys(roomsRef).map((roomRef)=>{
              Object.keys(roomRef['avatars']).map((a_user)=>{
                if(a_user === user) {
                  return roomRef['avatars'].remove();
                }
              });
            });
          }
        }
      });
      return 'nothing happened'
    });
