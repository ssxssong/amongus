import React from 'react';
import classes from './Status.module.css';


const Status = props => {
    const notice = () => {

    }
    const statistics = () => {

    }
    const setting = () => {

    }

    return (
        <div className={classes.Status}>
            <div><button onClick={notice}>Note</button></div>
            <div><button onClick={statistics}>Stat</button></div>
            <div><button onClick={setting}>Set</button></div>
        </div>
    );

};

export default Status;