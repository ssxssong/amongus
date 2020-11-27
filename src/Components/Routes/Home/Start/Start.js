import React from 'react';
import classes from './Start.module.css';
import {connect} from "react-redux";
import {actionCreator as statusAC} from "../../../../redux_store/status/actions";
import {locationType} from "../../../../const/const";

const Start = props => {
    const start = () => {
        props.setLocation(locationType.FOYER);
    }

    return <button className={classes.Start} onClick={start}>Start</button>
};

const mapDispatchToProps = dispatch => {
    return {
        setLocation: (location)=> dispatch(statusAC.set_location(location))
    }
}

export default connect(null, mapDispatchToProps)(Start);