import React, {useEffect, useState} from 'react';
import classes from './App.module.css';

// Compo
import Header from "./Components/Neutral/Header/Header";
import Status from "./Components/Neutral/Status/Status";
import BackgroundSketch from "./Components/BackgroundSketch/BackgroundSketch";
import Routes from "./Components/Routes/Routes";

import {auth} from "./firebase/Init";
import {actionCreator as authAC} from './redux_store/auth/actions';
import {actionCreator as roomsAC} from "./redux_store/rooms/actions";
import {actionCreator as statusAC} from "./redux_store/status/actions";
import {locationType} from "./utils/constatns";

import {useAuthState} from "react-firebase-hooks/auth";
import {connect} from "react-redux";
import {signOut} from "./firebase/auth/auth";

import {BrowserRouter} from 'react-router-dom';
const App = (props) => {
    console.log('[AppWrap]');
    const [user] = useAuthState(auth);
    // const [isRightWay, setIsRightWay] = useState(false);

    useEffect(()=>{
        if (!props.escaping) {
            (user && !props.stored) && props.storeUser(user);
        }
    });


    const signOutAndSetDefault = async () => {
        await props.setAuthDefault();
        await props.setRoomsDefault();
        await props.setStatusDefault();
        await props.setLocation(locationType.HOME);
        await signOut(()=>{window.location.href = locationType.HOME;});
    }

    return (
            <div className={classes.App}>
                <Header signOut={signOutAndSetDefault}/>
                <Status/>
                {/*<button style={{zIndex: '9999'}} onClick={() => {*/}
                {/*    const user = firebase.auth().currentUser;*/}
                {/*    // console.log(user);*/}
                {/*    user.delete().then(function () {*/}
                {/*        // User deleted.*/}
                {/*        console.log('deleted');*/}
                {/*    }).catch(function (error) {*/}
                {/*        // An error happened.*/}
                {/*    });*/}
                {/*}}> DELETE ACCOUNT </button>*/}
                <BackgroundSketch/>
                <Routes/>
            </div>
    );
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        stored: state.auth.stored,
        escaping: state.status.escaping
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUser: (user) => dispatch(authAC.store_user(user)),
        setAuthDefault: () => dispatch(authAC.set_default()),
        setRoomsDefault: () => dispatch(roomsAC.set_default()),
        setStatusDefault: () => dispatch(statusAC.set_default()),
        setLocation: (location) => dispatch(statusAC.set_location(location)),
        setEscaping: () => dispatch(statusAC.notice_escaping())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);