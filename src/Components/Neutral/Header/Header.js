import React, {useState} from 'react';
import classes from './Header.module.css';
import {locationType} from "../../../utils/constatns";
import {connect} from "react-redux";
import {actionCreator as authAC} from "../../../redux_store/auth/actions";
import {actionCreator as roomsAC} from "../../../redux_store/rooms/actions";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import {rdb_leaveRoom} from "../../../firebase/realtimeDB/rooms";
import {fs_leaveRoom} from "../../../firebase/firestore/rooms";

const Header = props => {
    console.log('[Header]');

    const [show, setShow] = useState({
        header: false,
        mod: true,
    });

    if (
      props.locatedAt !== locationType.HOME &&
      props.locatedAt !== locationType.INTRO &&
      props.locatedAt !== locationType.ESCAPE
    ) show.header === false && setShow({
        header: true,
        mod: show.mod
    })
    else show.header === true && setShow({
        header: false,
        mod: show.mod
    });


    return <>
        {show.header ? <div className={classes.Header}>
            {show.mod ?
                <button onClick={() => {
                    props.setEscaping();
                    setShow({
                        header: show.header,
                        mod: !show.mod
                    });
                }}>ESCAPE</button> :
                <button onClick={async () => {
                    setShow({
                        header: false,
                        mod: false,
                    });
                    if (props.user) console.log(props.myRoomId, props.user.uid)
                    if (props.myRoomId && props.user.uid) {
                        await rdb_leaveRoom(props.myRoomId, props.user.uid);
                        await fs_leaveRoom(props.myRoomId, props.user.uid, {
                            deletePosition: props.deletePosition,
                            go: () => {
                            }
                        });
                    }
                    props.signOut();
                }}>Sign Out</button>}
        </div>
            : null}
    </>;
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        myRoomId: state.status.myRoomId,
        locatedAt: state.status.locatedAt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEscaping: () => dispatch(statusAC.notice_escaping()),
        deletePosition: () => dispatch(statusAC.deletePosition())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);