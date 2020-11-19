import React, {useEffect} from 'react';
import classes from './Patio.module.css';
import {connect} from "react-redux";
import {actionCreator as statusAC} from "../../rootStore/status/actions";
import {actionCreator as callAC} from "../../rootStore/call/actions";
import {fs_getRoomData, fs_leaveRoom} from "../../firebase/fs_rooms/rooms";
import {locationType} from "../../constants/constatns";


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

    if (props.locatedAt !== locationType.PATIO) {
        console.log('[RELOCATION]');
        props.history.push(props.locatedAt);
        return null;
    }

    const leaveRoom = () => {
        props.setLocation(locationType.FOYER);
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

    return (
        <div className={classes.Patio}>
            <div className={classes.RoomData}>
                <div className={classes.Setting}>{roomData.setting && roomData.setting}</div>
                <div className={classes.Users}>{roomData.user && roomData.user}</div>
            </div>
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