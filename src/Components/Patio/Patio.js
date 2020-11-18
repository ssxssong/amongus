import React, {useEffect} from 'react';
import classes from './Patio.module.css';
import {connect} from "react-redux";
import {actionCreator as roomsAC} from "../../rootStore/rooms/actions";
import {actionCreator as statusAC, positionType} from "../../rootStore/status/actions";
import {fs_getRoomData} from "../../firebase/rooms/rooms";
import {locationType} from "../../constants/constatns";


const Patio = props => {
    console.log('[Patio]');
    props.located !== locationType.PATIO && props.history.replace(props.located);
    if (props.user && !props.roomData && props.myRoomId) {
        console.log(props.user, props.myRoomId);
        fs_getRoomData(
            props.myRoomId,
            props.user.uid,
            {
                storeRoomData: props.storeRoomData,
                storePosition: props.storePosition
            });
    }
    const leaveRoom = () => {
        props.setLocation(locationType.FOYER);
        props.history.push(locationType.FOYER);
    }


    let roomData = {
        'user': null,
        'setting': null
    };

    if (props.roomData) {
        let ctr=0;
        roomData['user'] = props.roomData && Object.keys(props.roomData.users).map((key)=>{
                return Object.keys(props.roomData.users[key]).map((k)=>{
                    return <div key={key + k} style={{color:'white'}}>{props.roomData.users[key][k]}</div>
                })
            })
        roomData['setting'] = props.roomData && Object.keys(props.roomData.setting).map((key) => {
            ctr++;
            return <div key={ctr} style={{color:'white'}}>{key} : {props.roomData.setting[key].value}</div>
        });
    }

    return (
        <div className={classes.Patio}>
            {roomData.user && roomData.user}
            {roomData.setting && roomData.setting}
            <div style={{color:'white'}}>{props.myRoomId}</div>
            <button onClick={leaveRoom}>Leave</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        myRoomId: state.status.myRoomId,
        roomData: state.status.roomData,
        located: state.status.located
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storePosition: (position) => dispatch(statusAC.store_Position(position)),
        deleteMyRoomId: () => dispatch(statusAC.deleteMyRoomId()),
        storeRoomData: (roomData) => dispatch(statusAC.storeRoomData(roomData)),
        deleteRoomData: () => dispatch(statusAC.deleteRoomData()),
        storeMyRoomId: (roomId)=> dispatch(statusAC.setMyRoomId(roomId)),
        setLocation: (location) => dispatch(statusAC.set_location(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patio);