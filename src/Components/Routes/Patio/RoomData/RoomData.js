import React, {useEffect} from 'react';
import classes from "../Patio.module.css";
import {fs_getRoomData} from "../../../../firebase/firestore/rooms";
import {actionCreator as statusAC} from "../../../../redux_store/status/actions";
import {connect} from "react-redux";

const RoomData = props => {
    // SUBSCRIBE TO FIRESTORE_ROOMDATA
    useEffect(()=>{
        if (props.myRoomId) {
            let unsubscribe = fs_getRoomData(
                props.myRoomId,
                props.user.uid,
                {
                    storeRoomData: props.storeRoomData,
                    storePosition: props.storePosition
                });

            // clear
            return () => unsubscribe();
        }
    }, []);


    let roomData = {
        'user': null,
        'setting': null
    };

    if (props.roomData) {
        let ctr=0;
        roomData['user'] = Object.keys(props.roomData.users).sort().map((key) => {
            ctr++;
            return (
                <div key={ctr} className={classes.User}>
                    {Object.keys(props.roomData.users[key]).map((k) => {
                        ctr++;
                        return <div key={ctr} style={{color: 'white'}}>{props.roomData.users[key][k]}</div>;
                    })}
                </div>
            );
        });
        roomData['setting'] = Object.keys(props.roomData.setting).sort().map((key) => {
            ctr++;
            return <div key={ctr} style={{color: 'white'}}>{key} : {props.roomData.setting[key].value}</div>;
        });
    }

    return <div className={classes.RoomData}>
        <div className={classes.Setting}>{roomData.setting && roomData.setting}</div>
        <div className={classes.Users}>{roomData.user && roomData.user}</div>
    </div>;
};


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        myRoomId: state.status.myRoomId,
        roomData: state.status.roomData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storePosition: (position) => dispatch(statusAC.store_Position(position)),
        storeRoomData: (roomData) => dispatch(statusAC.storeRoomData(roomData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomData);