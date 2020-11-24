import React, {useState} from "react";
import classes from "./SignIn.module.css";
import {signInWithGoogle} from "../../../../firebase/auth/auth";
import {actionCreator as authAC} from "../../../../redux_store/auth/actions";
import {actionCreator as statusAC} from "../../../../redux_store/status/actions";
import {connect} from "react-redux";

const SignIn = props => {
    console.log('[SignIn]');
    const [clicked, setClicked] = useState({
        mod: true
    })
    return <div className={classes.SignIn}>
        {props.trying ?
            <div> LOADING </div> :
            clicked.mod ? <button onClick={() => {
                    props.setNotEscaping();
                    setClicked({mod: !clicked.mod})
            }}> SIGN IN </button> :
                <button onClick={() => {
                    props.setTrying();
                    signInWithGoogle(props.setFailed);
            }}> SIGN IN WITH GOOGLE </button>
        }
    </div>;
};

const mapStateToProps = state => {
    return {
        trying: state.auth.trying,
    };
}

const mapDipatchToProps = dispatch => {
    return {
        setTrying: () => dispatch(authAC.set_trying()),
        setFailed: () => dispatch(authAC.set_failed()),
        setNotEscaping: () => dispatch(statusAC.notice_not_escaping())
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(SignIn);