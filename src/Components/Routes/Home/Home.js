import React from 'react';
import classes from './Home.module.css';
import {locationType} from "../../../const/const";
import {connect} from "react-redux";
import useLocationCheck from "../../../customHooks/useLocationCheck";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import SignIn from "./SignIn/SignIn";
import Start from "./Start/Start";


const Home = props => {
    useLocationCheck(props.locatedAt, locationType.HOME, props.history);
    return <div className={classes.Home}>
        <div className={classes.Title}>AMONG US</div>
        <div className={classes.SignIn}>
            {!props.loggedIn && <SignIn/>}
            {(props.loggedIn && !props.user) && <div className={classes.Loading}>Recieving User Data</div>}
            {(props.loggedIn && props.user) && <Start/>}
        </div>
    </div>
}

const MSTP = state => {
    return {
        user: state.auth.user,
        locatedAt: state.status.locatedAt,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(MSTP)(Home)