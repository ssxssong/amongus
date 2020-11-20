import React from 'react';
import firebase from "firebase/app";
import {actionCreator as authAC, actionCreator} from "../../../rootStore/auth/actions";
import {actionCreator as statusAC} from "../../../rootStore/status/actions";
import {actionCreator as roomsAC} from "../../../rootStore/rooms/actions";
import {connect} from "react-redux";
import {locationType} from "../../../constants/constatns";
import {fs_leaveRoom} from "../../../firebase/fs_rooms/rooms";

const Escape = props => {
    props.noticeEscaping();
    return <div style={{
        zIndex: '9999',
    }}>
        <button onClick={()=>{props.history.push(props.locatedAt)}}>BACK</button>
        <button
            onClick={() => {
                console.log('[redux default setting]');
                if (props.locatedAt === locationType.PATIO) {
                    console.log('###[ESCAPE_LEAVEROOM]###', props.user.uid)
                    fs_leaveRoom(props.myRoomId, props.user.uid, {
                        deletePosition: props.deletePosition,
                        go: () => {
                            firebase.auth().signOut()
                                .then(() => {
                                    props.setDefaultStatus();
                                    props.setDefaultAuth();
                                    props.setDefaultRooms();
                                    props.history.push(locationType.HOME);
                                })
                                .catch((error) => console.log(error));
                        }
                    })
                } else {
                    firebase.auth().signOut()
                        .then(() => {
                            props.setDefaultStatus();
                            props.setDefaultAuth();
                            props.setDefaultRooms();
                            props.history.push(locationType.HOME);
                        })
                        .catch((error) => console.log(error));
                }
            }}>
            ESCAPE
        </button>
    </div>;
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
        setDefaultStatus: () => dispatch(statusAC.set_default()),
        setDefaultAuth: () => dispatch(authAC.set_default()),
        setDefaultRooms: () => dispatch(roomsAC.set_default()),
        noticeEscaping: ()=> dispatch(statusAC.notice_escaping()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Escape);