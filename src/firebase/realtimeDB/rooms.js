import {rdb} from "../Init";
import {avatarDefaults} from "../../const/sketch_ingredients/avatarDefault";

export const LOBBY = '/lobby/'
export const AVATAR = '/avatar/'
export const POSITION = '/position/'
export const STATUS = '/status/'
export const USERS = '/users/'

export const rdb_setRoomData_user = async (roomId, uid) => {
    const avatarRef = rdb.ref(LOBBY + roomId + USERS + uid + AVATAR + POSITION);
    await avatarRef.set(avatarDefaults.DEFAULT_POSITION);
}

export const rdb_deleteRoomData_user = async (roomId, uid) => {
    const usersRef = rdb.ref(LOBBY + roomId + USERS);
    let users = null;
    await usersRef.once('value', (s)=>{
        users = s.val()
        Object.keys(users).forEach((u)=>{
            if (u === uid) {
                delete users[u]
            }
        })
    })
    const roomRef = rdb.ref(LOBBY + roomId);
    await roomRef.update({users:users}, (e)=>{console.log(e)})
}

export const rdb_delete_all = async () => {
    const ref = rdb.ref('/')
    await ref.remove()
}

export const rdb_room_listener = (roomId, observer) => {
    rdb.ref(LOBBY + roomId).on('value', observer)
}
export const rdb_unsubscribe_room_listener = (roomId) => {
    return rdb.ref(LOBBY + roomId).off()
}

export const rdb_update_position = async (roomId, uid, position) => {
    const userStatusDatabaseRef = rdb.ref(LOBBY + roomId + USERS + uid + AVATAR + POSITION);
    await userStatusDatabaseRef.set({
        x: position.x,
        y: position.y
    });
}
