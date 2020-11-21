import React from 'react';
import classes from './Header.module.css';
import {locationType} from "../../../utils/constatns";

const Header = props => {
    console.log('[Header]');

    return (
        <div className={classes.Header}>

        </div>
    );
};

export default React.memo(Header);