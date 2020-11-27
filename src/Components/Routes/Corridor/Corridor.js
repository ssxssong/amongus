import React, {useState, useEffect} from 'react';
import {locationType} from "../../../const/const";
import {connect} from "react-redux";
import useLocationCheck from "../../../customHooks/useLocationCheck";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import {actionCreator as roomsAC} from "../../../redux_store/rooms/actions";
import classes from './Corridor.module.css';
import {fs_getRoomData, fs_getRoomList, fs_onRoomData, fs_updateRoomData_user} from "../../../firebase/firestore/rooms";
import {rdb_setRoomData_user} from "../../../firebase/realtimeDB/rooms";

const Corridor = props => {
    useLocationCheck(props.locatedAt, locationType.PATIO, props.history);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=>!isLoaded && setIsLoaded(true), [isLoaded]);

    const getRoomList = async () => {
        const roomList = await fs_getRoomList()
        props.storeRoomList(roomList)
    };
    !isLoaded && getRoomList();

    const joinRoom = async (e) => {
        let roomId = null;
        roomId = e.target.className === classes.Room ?
            e.target.id :
            e.target.parentElement.id;
        const params = {
            uid: props.user.uid,
            nickname: props.nickname,
            displayName: props.user.displayName
        };
        const doc = await fs_getRoomData(roomId)
        if (doc.exists) {
            const currentUsers = doc.data().users
            const oldUser = currentUsers.some((userObj) => {
                return userObj.uid === params.uid
            })
            if (!oldUser) {
                currentUsers.push({
                    uid: props.user.uid,
                    nickname: props.nickname,
                    displayName: props.user.displayName
                })
                const msg = await fs_updateRoomData_user(roomId, currentUsers);
                await rdb_setRoomData_user(roomId, props.user.uid)
                msg && props.storeMyRoomId(roomId);
                msg && props.setLocation(locationType.PATIO);
            }
        }
    }

    let roomList = null;
    if (props.roomList) {
        roomList = Object.keys(props.roomList).map((key)=>{
            // key === doc.id === room.id
            return (
                <button
                    className={classes.Room}
                    key={key}
                    id={key}
                    disabled={!props.user}
                    onClick={joinRoom}>
                    <div className={classes.RoomName}>{props.roomList[key].users[0].nickname}</div>
                    <div className={classes.Population}>
                        {props.roomList[key].users.length}/{props.roomList[key].setting.maxUser.value}</div>
                </button>
            )
        })
    }

    return (
        <div className={classes.Corridor}>
            <div className={classes.RoomList}>{roomList}</div>
            <button onClick={getRoomList} disabled={!props.user}>Refresh</button>
            <button onClick={()=>{
                props.setLocation(locationType.FOYER);
                props.history.push(locationType.FOYER);
            }}>back</button>
        </div>
    );
}


const MSTP = state => {
    return {
        user: state.auth.user,
        nickname: state.status.nickname,
        locatedAt: state.status.locatedAt,
        roomList: state.rooms.roomList
    }
}

const MDTP = dispatch => {
    return {
        storeRoomList: (room) => dispatch(roomsAC.store_roomList(room)),
        storeMyRoomId: (myRoomId) => dispatch(statusAC.store_myRoomId(myRoomId)),
        setLocation: (location)=>dispatch(statusAC.set_location(location))
    }
}

export default connect(MSTP, MDTP)(Corridor)