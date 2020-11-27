import React, {useEffect, useState} from 'react';
import {locationType, positionType} from "../../../const/const";
import {connect} from "react-redux";
import useLocationCheck from "../../../customHooks/useLocationCheck";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import classes from './Patio.module.css';
import RoomData from "./RoomData/RoomData";
import {fs_getRoomData, fs_updateRoomData_user, fs_deleteRoomDoc} from "../../../firebase/firestore/rooms";
import LobbySketch from "./Lobby/LobbySketch";
import {rdb_sub_user_connection, rdb_unsub_user_connection} from "../../../firebase/realtimeDB/connection";
import {rdb_deleteRoomData_user} from "../../../firebase/realtimeDB/rooms";

const Patio = props => {
    useLocationCheck(props.locatedAt, locationType.PATIO, props.history);

    useEffect(()=>{
        rdb_sub_user_connection(props.myRoomId, props.user.uid)

        return rdb_unsub_user_connection();
    }, [])

    const [leaving, setLeaving] = useState(false)
    const leaveRoom = async () => {
        const doc = await fs_getRoomData(props.myRoomId)
        if (doc.exists) {
            // if leaving user is last person, delete room doc
            if (doc.data().users.length === 1) {
                const msg = await fs_deleteRoomDoc(props.myRoomId)
                await rdb_deleteRoomData_user(props.myRoomId, props.user.uid)
                msg && props.setLocation(locationType.FOYER)
                msg && props.storePosition(positionType.WAITING)
            }
            // else, keep room doc
            else {
                const updated_users = doc.data().users;
                let index = null;
                updated_users.forEach((userObj) => {
                    if (userObj.uid === props.user.uid) {
                        index = updated_users.indexOf(userObj);
                    }
                });
                updated_users.splice(index, 1);
                const msg = await fs_updateRoomData_user(props.myRoomId, updated_users)
                await rdb_deleteRoomData_user(props.myRoomId, props.user.uid)
                msg && props.setLocation(locationType.FOYER)
                msg && props.storePosition(positionType.WAITING)
            }
        }
    }

    return <div className={classes.Patio}>
        <RoomData/>
        {!leaving && <LobbySketch/>}
        {!leaving ?
            <button onClick={()=>{setLeaving(true)}}>LEAVE</button> :
            <>
                <button onClick={leaveRoom}>Y</button>
                <button onClick={()=>{setLeaving(false)}}>N</button>
            </>}
    </div>
}


const MSTP = state => {
    return {
        user: state.auth.user,
        locatedAt: state.status.locatedAt,
        myRoomId: state.status.myRoomId
    }
}

const MDTP = dispatch => {
    return {
        storePosition: (position) => dispatch(statusAC.store_position(position)),
        setLocation: (location)=>dispatch(statusAC.set_location(location)),
    }
}

export default connect(MSTP, MDTP)(Patio)