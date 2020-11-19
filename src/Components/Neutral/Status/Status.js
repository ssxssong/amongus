import React from 'react';
import {actionCreator as statusAC} from "../../../rootStore/status/actions";
import {actionCreator as authAC, actionCreator} from "../../../rootStore/auth/actions";
import {actionCreator as roomsAC} from "../../../rootStore/rooms/actions";
import {connect} from "react-redux";

const Status = props => {
    return (
        <div style={{
                color: 'white',
                position: 'absolute',
                bottom: '10rem',
                left: '1rem',
                fontSize: '1.5rem'
            }}>
            <div style={{color: 'white', margin: '1rem'}}>user.uid :
                {props.user ? props.user.uid : ''}</div>
            <div style={{color: 'white', margin: '1rem'}}>user.displayName :
                {props.user ? props.user.displayName : ''}</div>
            <div style={{color: 'white', margin: '1rem'}}>user.nickname :
                {props.nickname ? props.nickname : ''}</div>
            <div style={{color: 'white', margin: '1rem'}}>position :
                {props.position ? props.position : 'WAITING'}</div>
            <div style={{color: 'white', margin: '1rem'}}>myRoomId :
                {props.myRoomId ? props.myRoomId : ''}</div>
            <div style={{color: 'white', margin: '1rem'}}>onSnapshotCounter:
                {props.onSnapshotCounter ? props.onSnapshotCounter : ''}</div>
            <div style={{color: 'white', margin: '1rem'}}>locatedAt :
                {props.locatedAt ? props.locatedAt : ''}</div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        stored: state.auth.stored,
        position: state.status.position,
        myRoomId: state.status.myRoomId,
        nickname: state.status.nickname,
        locatedAt: state.status.locatedAt,
        onSnapshotCounter: state.call.onSnapshotCounter,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePosition: ()=> dispatch(statusAC.deletePosition()),
        storeUser: (user) => dispatch(actionCreator.store_user(user)),
        setLocation: (location)=> dispatch(statusAC.set_location(location)),
        setDefautStatus: () => dispatch(statusAC.set_default()),
        setDefautAuth: () => dispatch(authAC.set_default()),
        setDefautRooms: () => dispatch(roomsAC.set_default()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);