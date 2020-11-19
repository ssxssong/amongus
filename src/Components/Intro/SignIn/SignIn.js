import React from "react";
import classes from "./SignIn.module.css";
import {signInWithGoogle} from "../../../firebase/signIn/signInWithGoogle";
import {locationType} from "../../../constants/constatns";

const SignIn = props => {
    console.log('[SignIn]');
    return <>
        <div className={classes.SignIn}>
            <button onClick={() => {
                signInWithGoogle(()=> {
                    props.setLocation(locationType.INTRO);
                    props.history.push(locationType.INTRO);
                });
            }}> SIGN IN WITH GOOGLE
            </button>
        </div>
    </>;
};

export default SignIn;