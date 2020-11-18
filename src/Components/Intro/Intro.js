import React from 'react';
import { connect } from 'react-redux';
import SignIn from "./SignIn/SignIn";
import Start from './Start/Start';
import Header from "../Neutral/Header/Header";
import classes from './Intro.module.css';
import {actionCreator as statusAC, positionType} from "../../rootStore/status/actions";
import {locationType} from "../../constants/constatns";

const Intro = props => {
    console.log('[Intro]');
    // props.located !== locationType.HOME && props.history.replace(props.located);

    // if not in patio
    if (props.user && (props.nickname !== undefined)) {
        if (props.position !== positionType.WAITING) {
            props.storePosition(positionType.WAITING);
            props.deleteMyRoomId();
            props.deleteRoomData();
        }
    }

    let intro = null;
    props.user ? intro = (
        <>
            {/*<div className={classes.Title}>AMONG US</div>*/}
            <Header history={props.history}/>
            <Start history={props.history}/>
        </>
    ) : intro = (
        <>
            <div className={classes.Title}>AMONG US</div>
            <SignIn/>
        </>
    );

    return (
        <div className={classes.Intro}>
            {intro}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        position: state.status.position,
        nickname: state.status.nickname,
        located: state.status.located
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storePosition: (position) => dispatch(statusAC.store_Position(position)),
        deleteMyRoomId: ()=> dispatch(statusAC.deleteMyRoomId()),
        deleteRoomData: () => dispatch(statusAC.deleteRoomData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);