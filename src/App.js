import React, {useEffect} from 'react';
import classes from './App.module.css';

import Header from "./Components/Header/Header";
import Status from "./Components/Status/Status";
import BackgroundSketch from "./Components/BackgroundSketch/BackgroundSketch";
import Routes from "./Components/Routes/Routes";
import {actionCreator as authAC} from "./redux_store/auth/actions";

import {auth} from "./firebase/Init";
import {useAuthState} from "react-firebase-hooks/auth";
import {connect} from "react-redux";

const App = (props) => {
    console.log('[AppWrap]')

    const [user] = useAuthState(auth)
    useEffect(()=>{
        (!props.user && props.loggedIn) && props.storeUser(user)
    })

    return <div className={classes.App}>
        <Header/>
        <Status/>
        <Routes/>
        <BackgroundSketch/>
    </div>
}

const MSTP = state => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
    }
}

const MDTP = dispatch => {
    return {
        storeUser: (user) => dispatch(authAC.store_user(user)),
        setLoggedIn: () => dispatch(authAC.set_loggedIn()),
    }
}
export default connect(MSTP, MDTP)(App)