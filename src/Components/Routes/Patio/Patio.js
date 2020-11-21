import React, {useEffect, useState} from 'react';
import classes from './Patio.module.css';
import {connect} from "react-redux";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import {fs_leaveRoom} from "../../../firebase/firestore/rooms";
import {rdb_leaveRoom, rdb_subscribe_roomData, rdb_unsubscribe_roomData} from "../../../firebase/realtimeDB/rooms";
import {
    rdb_subscribe_usersConnectionData,
    rdb_unsubscribe_usersConnectionData
} from "../../../firebase/realtimeDB/connection";
import {locationType} from "../../../utils/constatns";

import RoomData from "./RoomData/RoomData";
import LobbySketch from "./Lobby/LobbySketch";
import KeyManager from "./KeyManager/KeyManager";


const Patio = props => {
    console.log('[Patio]');
    const [roomData, setRoomData] = useState(null);
    const [showLobby, setShowLobby] = useState(false);
    useEffect(()=>{
        rdb_subscribe_roomData(props.myRoomId, setRoomData);
        rdb_subscribe_usersConnectionData(props.myRoomId, props.deletePosition);

        return ()=> {
            rdb_unsubscribe_roomData(props.myRoomId);
            rdb_unsubscribe_usersConnectionData();
        }
    }, []);

    if (props.locatedAt !== locationType.PATIO) {
        console.log('[RELOCATION]');
        props.history.push(props.locatedAt);
        return null;
    }

    const leaveRoom = () => {
        props.setLocation(locationType.FOYER);
        rdb_leaveRoom(props.myRoomId, props.user.uid);
        fs_leaveRoom(props.myRoomId, props.user.uid, {
            deletePosition: props.deletePosition,
            go: () => props.history.push(locationType.FOYER)
        });
    };


    if (roomData && roomData.avatars && !showLobby) {
        setShowLobby(true);
    } else {
        showLobby && setShowLobby(false);
    }

    return <div className={classes.Patio}>
        <RoomData/>

        {showLobby &&
        <KeyManager
            component={LobbySketch}
            roomData={roomData}
            uid={props.user.uid}
            myRoomId={props.myRoomId}
            myPosition={props.position}/>}

        <button onClick={leaveRoom}>Leave</button>
    </div>;
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        myRoomId: state.status.myRoomId,
        roomData: state.status.roomData,
        locatedAt: state.status.locatedAt,
        position: state.status.position
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLocation: (location)=> dispatch(statusAC.set_location(location)),
        deletePosition: ()=> dispatch(statusAC.deletePosition()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patio);