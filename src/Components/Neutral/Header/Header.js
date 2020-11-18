import React from 'react';
import classes from './Header.module.css';
import SignOut from "./SignOut/SignOut";

const Header = props => {
    console.log('[Header]');

    return (
        <div className={classes.Header}>
            <SignOut {...props}/>
        </div>
    );
};

export default React.memo(Header);