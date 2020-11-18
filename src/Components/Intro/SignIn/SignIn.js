import React from "react";
import classes from "./SignIn.module.css";
import {signInWithGoogle} from "../../../firebase/signIn/signInWithGoogle";

const SignIn = () => {
    console.log('[SignIn]');
    const LS = window.localStorage;

    let signIn = null;
    if (LS.loggedOn === undefined) {
        signIn = (
            <div className={classes.SignIn}>
                <button onClick={() => {
                    signInWithGoogle();
                    LS.setItem('loggedOn', 'true');
                }}> SIGN IN WITH GOOGLE
                </button>
            </div>);
    } else {
        signIn = (
            <div style={{color:'white'}} disabled></div>
        )
    }

    return (<>{signIn}</>);
};

export default SignIn;