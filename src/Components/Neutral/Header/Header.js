import React from 'react';
import classes from './Header.module.css';
import {locationType} from "../../../constants/constatns";

const Header = props => {
    console.log('[Header]');

    return (
        <div className={classes.Header}>
            <button className={classes.Escape} onClick={()=>{window.location.href=locationType.ESCAPE}}>
                ESCAPE
            </button>
        </div>
    );
};

export default React.memo(Header);