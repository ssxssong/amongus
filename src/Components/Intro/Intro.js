import React from 'react';
import { connect } from 'react-redux';
import SignIn from "./SignIn/SignIn";
import Start from './Start/Start';
import classes from './Intro.module.css';
import {locationType} from "../../constants/constatns";

const Intro = props => {
    console.log('[Intro]');

    if (props.locatedAt !== locationType.INTRO) {
        console.log('[RELOCATION]');
        props.history.push(props.locatedAt);
        return null;
    }
    return (
        <div className={classes.Intro}>
            {props.user.uid ?<Start dis={props.user.uid} history={props.history}/> : 'LOADING'}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        locatedAt: state.status.locatedAt
    }
}


export default connect(mapStateToProps)(Intro);