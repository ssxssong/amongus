import React, {useEffect} from 'react';
import classes from './App.module.css';

// Compo
import Header from "./Components/Neutral/Header/Header";
import Status from "./Components/Neutral/Status/Status";
import BackgroundSketch from "./Components/BackgroundSketch/BackgroundSketch";
import Routes from "./Components/Routes/Routes";

import {auth} from "./firebase/Init";
import {actionCreator as authAC} from './redux_store/auth/actions';
import {locationType} from "./utils/constatns";
import {rdb_user_connection} from "./firebase/realtimeDB/connection";

import {useAuthState} from "react-firebase-hooks/auth";
import {connect} from "react-redux";



const App = (props) => {
    console.log('[AppWrap]');
    const [user] = useAuthState(auth);
    useEffect(()=>{
        (user && !props.stored) && props.storeUser(user);
    });

    if(props.user) {
        rdb_user_connection(props.user.uid);
    }

    const current_path = window.location.pathname;
    const showHeader = (
      current_path !== locationType.HOME &&
      current_path !== locationType.INTRO &&
      current_path !== locationType.ESCAPE
    );

    return (
            <div className={classes.App}>
                {showHeader ? <Header/> : null}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUser: (user) => dispatch(authAC.store_user(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);