import React, {useState} from 'react';
import classes from './Header.module.css';
import StarButton from "./StarButton/StarButton";
import {actionCreator as authAC} from "../../redux_store/auth/actions";
import {actionCreator as roomsAC} from "../../redux_store/rooms/actions";
import {actionCreator as statusAC} from "../../redux_store/status/actions";
import {connect} from "react-redux";
import {rdb_delete_all} from "../../firebase/realtimeDB/rooms";
import {fs_delete_all} from "../../firebase/firestore/rooms";
import {signOut} from "../../firebase/auth/auth";

const Header = props => {
    return <div className={classes.Header}>
        <StarButton/>
        <div className={classes.DEV}>
            <button onClick={() => {
                signOut().then(() => {
                    props.setDefaultAuth()
                    props.setDefaultRooms()
                    props.setDefaultStatus()
                });
            }}>TEST_SIGN OUT
            </button>
            <button onClick={() => {
                fs_delete_all().then();
            }}>TEST__DELETE_FIRESTORE_DATAS
            </button>
            <button onClick={() => {
                rdb_delete_all().then();
            }}>TEST__DELETE_REALTIMEDB_DATAS
            </button>
            <button onClick={() => {
                props.setDefaultAuth();
                props.setDefaultRooms();
                props.setDefaultStatus();
            }}>TEST__CLEAR_LOCAL_STORAGE
            </button>
            <button onClick={() => {
                window.location.href = ''
            }}>TEST__GO_HOME
            </button>
        </div>
    </div>;
}


const MDTP = dispatch => {
    return {
        setDefaultAuth: () => dispatch(authAC.set_default()),
        setDefaultRooms: () => dispatch(roomsAC.set_default()),
        setDefaultStatus: () => dispatch(statusAC.set_default()),
    }
}

export default connect(null, MDTP)(Header)