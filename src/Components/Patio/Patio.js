import React, {useEffect, useState} from 'react';
import classes from './Patio.module.css';
import {connect} from "react-redux";
import {actionCreator as statusAC, positionType} from "../../rootStore/status/actions";
import {actionCreator as callAC} from "../../rootStore/call/actions";
import {fs_getRoomData, fs_leaveRoom} from "../../firebase/fs_rooms/rooms";
import {rdb_leaveRoom} from "../../firebase/rdb_rooms/rooms";
import {locationType} from "../../constants/constatns";

import Lobby from "./Lobby/Lobby";
import {rdb} from "../../firebase/firebaseInit";
import firebase from "firebase/app";
import 'firebase/database';


const Patio = props => {
    console.log('[Patio]');

    useEffect(()=>{
        if (props.myRoomId ) {
            let unsubscribe = fs_getRoomData(
            props.myRoomId,
            props.user.uid,
            {
                storeRoomData: props.storeRoomData,
                storePosition: props.storePosition
            },
            props.onSnapshotCounter);

            // clear
            return () => unsubscribe();
        }
    }, []);

    useEffect(()=>{
        const roomRef = rdb.ref('/rooms/' + props.myRoomId);
        roomRef.on('value', (snapshot) => {
            setSV({...snapshot.val()});
        });

        const statusRef = rdb.ref('/status/users')
            statusRef.on('value', (snapshot)=>{
                const users = snapshot.val();
                Object.keys(users).forEach((user)=>{
                    if (users[user].state === 'offline') {
                        console.log('function invoking', user)
                        const tempTimestampRef = rdb.ref('/tempTimestamp')
                        tempTimestampRef.set(
                            firebase.database.ServerValue.TIMESTAMP, () => {
                                tempTimestampRef.once('value').then((s) => {
                                    console.log(s.val() - users[user].last_changed + 30000);
                                    if ((s.val() - users[user].last_changed + 30000) > 0) {
                                        console.log('여기', user)
                                        rdb.ref('/rooms/' + props.myRoomId + '/avatars/' + user)
                                            .remove().then();
                                        fs_leaveRoom(props.myRoomId, user, {
                                            deletePosition: props.deletePosition,
                                            go: ()=>{}
                                        })
                                    }
                                });
                            });
                        }
                    });
                });
        // return roomRef.off();
    }, []);
    const [snapshotVal, setSV] = useState(null);
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

    let roomData = {
        'user': null,
        'setting': null
    };

    if (props.roomData) {
        let ctr=0;
        roomData['user'] = props.roomData && Object.keys(props.roomData.users).map((key)=>{
                return <div className={classes.User}>
                    {Object.keys(props.roomData.users[key]).map((k)=>{
                    return <div style={{color:'white'}}>{props.roomData.users[key][k]}</div>
                })}
                </div>;
            })
        roomData['setting'] = props.roomData && Object.keys(props.roomData.setting).map((key) => {
            ctr++;
            return <div key={ctr} style={{color:'white'}}>{key} : {props.roomData.setting[key].value}</div>
        });
    }
    //
    // let showLobby = false;
    // if (!snapshotVal) {
    //     // if (snapshotVal.avatars[props.user.uid]) {
    //     //     showLobby = true;
    //     // }
    //     console.log(snapshotVal);
    // }

    return (
        <div className={classes.Patio}>
            <div className={classes.RoomData}>
                <div className={classes.Setting}>{roomData.setting && roomData.setting}</div>
                <div className={classes.Users}>{roomData.user && roomData.user}</div>
            </div>
            {snapshotVal && <Lobby snapshot={snapshotVal}/>}
            <button onClick={leaveRoom}>Leave</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        myRoomId: state.status.myRoomId,
        roomData: state.status.roomData,
        onSnapshotCounter: state.call.onSnapshotCounter,
        locatedAt: state.status.locatedAt,
        position: state.status.position
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storePosition: (position) => dispatch(statusAC.store_Position(position)),
        deletePosition: () => dispatch(statusAC.deletePosition()),
        deleteMyRoomId: () => dispatch(statusAC.deleteMyRoomId()),
        storeRoomData: (roomData) => dispatch(statusAC.storeRoomData(roomData)),
        deleteRoomData: () => dispatch(statusAC.deleteRoomData()),
        storeMyRoomId: (roomId)=> dispatch(statusAC.setMyRoomId(roomId)),
        count_onSnapshot: ()=> dispatch(callAC.count_onSnapshot()),
        setLocation: (location)=> dispatch(statusAC.set_location(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patio);