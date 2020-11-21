import React from 'react';
import {connect} from "react-redux";
import classes from './Status.module.css';

const Status = props => {
    return (
        <div className={classes.Status}>
            <div>user.uid :{props.user ? props.user.uid : ''}</div>
            <div>user.displayName :{props.user ? props.user.displayName : ''}</div>
            <div>user.nickname :{props.nickname ? props.nickname : ''}</div>
            <div>position :{props.position ? props.position : 'WAITING'}</div>
            <div>myRoomId :{props.myRoomId ? props.myRoomId : ''}</div>
            <div>locatedAt :{props.locatedAt ? props.locatedAt : ''}</div>
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
    }
}

export default connect(mapStateToProps)(Status);