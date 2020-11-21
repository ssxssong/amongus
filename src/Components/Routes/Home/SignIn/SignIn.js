import React from "react";
import classes from "./SignIn.module.css";
import {signInWithGoogle} from "../../../../firebase/auth/auth";

const SignIn = props => {
    console.log('[SignIn]');
    return <div className={classes.SignIn}>
        <button onClick={() => {
            signInWithGoogle();
        }}> SIGN IN WITH GOOGLE
        </button>
    </div>;
};

export default SignIn;