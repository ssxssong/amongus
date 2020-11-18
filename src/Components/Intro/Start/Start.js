import React from 'react';
import classes from './Start.module.css';
import {connect} from "react-redux";
import {actionCreator as statusAC} from "../../../rootStore/status/actions";
import {locationType} from "../../../constants/constatns";

const Start = props => {
    const start = () => {
        props.setLocation(locationType.FOYER);
        props.history.push(locationType.FOYER);
    }

    return (
        <div className={classes.Start}>
            <button onClick={start}>Start</button>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setLocation: (location)=> dispatch(statusAC.set_location(location))
    }
}

export default connect(null, mapDispatchToProps)(Start);