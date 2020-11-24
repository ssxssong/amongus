import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './Corridor.module.css';
import {actionCreator as roomsAC} from "../../../redux_store/rooms/actions";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import {fs_getRoomList, fs_joinRoom} from "../../../firebase/firestore/rooms";
import {locationType} from "../../../utils/constatns";

const Corridor = props => {
    console.log('[Corridor]');
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=>!isLoaded && setIsLoaded(true), [isLoaded]);

    if (props.locatedAt !== locationType.CORRIDOR && window.location.pathname !== locationType.CORRIDOR) {
        console.log('[RELOCATION]');
        props.history.push(props.locatedAt);
    }

    const getRoomList = () => {
        console.log('[GETTING ROOMLIST]')
        fs_getRoomList(props.storeRoomList);
    };
    !isLoaded && getRoomList();

    const joinRoom = (e) => {
        let roomId = null;
        roomId = e.target.className === classes.Room ?
            e.target.id :
            e.target.parentElement.id;
        const params = {
            uid: props.user.uid,
            nickname: props.nickname,
            displayName: props.user.displayName
        };
        props.storeMyRoomId(roomId);
        props.setLocation(locationType.PATIO);
        fs_joinRoom(roomId, params, ()=> props.history.push(locationType.PATIO));
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
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        roomList: state.rooms.roomList,
        myRoomId: state.status.myRoomId,
        nickname: state.status.nickname,
        locatedAt: state.status.locatedAt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeRoomList: (room) => dispatch(roomsAC.store_roomList(room)),
        storeMyRoomId: (roomId)=> dispatch(statusAC.setMyRoomId(roomId)),
        setLocation: (location)=> dispatch(statusAC.set_location(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Corridor);