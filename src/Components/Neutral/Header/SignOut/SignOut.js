import React from "react";
import firebase from "firebase/app";

// css module
import classes from './SignOut.module.css';

// SignOut
const SignOut = props => {
    console.log('[SignOut]');
    const signOut = () => {
        firebase.auth().signOut()
            .then(()=> {
                window.localStorage.clear();
                props.history.push('/');
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    return (
        <button className={classes.SignOut} onClick={signOut}>Sign Out</button>
    );
}

export default SignOut;
