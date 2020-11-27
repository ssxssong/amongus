import React from 'react';
import {signInWithGoogle} from "../../../../firebase/auth/auth";
import {connect} from "react-redux";
import classes from './SignIn.module.css';
import {actionCreator as authAC} from "../../../../redux_store/auth/actions";

const SignIn = props => {
    return <button className={classes.SignIn} onClick={() => {
        signInWithGoogle().then(props.setLoggedIn());
    }}>
        SIGN IN WITH GOOGLE
    </button>
}

const MDTP = dispatch => {
    return {
        setLoggedIn: () => dispatch(authAC.set_loggedIn()),
    }
}
export default connect(null, MDTP)(SignIn)