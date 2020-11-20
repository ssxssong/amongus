import React, {useEffect} from 'react';
import classes from './App.module.css';
import {Route, Switch} from 'react-router-dom';

// Compo
import Header from "./Components/Neutral/Header/Header";
import Status from "./Components/Neutral/Status/Status";
import Home from "./Components/Home/Home";
import Intro from "./Components/Intro/Intro";
import Foyer from "./Components/Foyer/Foyer";
import Patio from "./Components/Patio/Patio";
import Corridor from "./Components/Corridor/Corridor";
import Escape from "./Components/Neutral/Escape/Escape";
import BackgroundSketch from "./Memo/BackgroundSketch/BackgroundSketch";

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase/firebaseInit";

import {actionCreator as authAC} from './rootStore/auth/actions';
import {actionCreator as statusAC} from "./rootStore/status/actions";
import {locationType} from "./constants/constatns";
import {Beforeunload} from "react-beforeunload";
import {connect} from "react-redux";
import {userConnection} from "./firebase/realtime/connection/connection";
import {actionCreator as roomsAC} from "./rootStore/rooms/actions";


const App = (props) => {
    console.log('[AppWrap]');
    const [user] = useAuthState(auth);
    useEffect(()=>{
        (user && !props.stored && !props.escaping) && props.storeUser(user);
    });

    if(props.user.uid) {
        userConnection(props.user.uid);
    }

    const current_path = window.location.pathname;
    const showHeader = (
      current_path !== locationType.HOME &&
      current_path !== locationType.INTRO &&
      current_path !== locationType.ESCAPE
    );

    if (current_path !== locationType.ESCAPE && props.escaping) {
        props.noticeNotEscaping();
    }

    return (
        <Beforeunload onBeforeunload={(e)=>{
        }}>
            <div className={classes.App}>
                {showHeader ? <Header/> : null}
                <Status/>
                {/*{user ? <div style={{*/}
                {/*    color:'white',*/}
                {/*}}>'user auth exists.'</div>: <div style={{*/}
                {/*    color:'white',*/}
                {/*}}>'user auth doesn't exists.'</div>}*/}
                <div className={classes.BackgroundSketch}>
                    <BackgroundSketch/>
                </div>

                <Switch>
                    <Route path={locationType.HOME} exact component={Home} history={props.history}/>
                    <Route path={locationType.INTRO} exact component={Intro} history={props.history}/>
                    <Route path={locationType.FOYER} exact component={Foyer} history={props.history}/>
                    <Route path={locationType.CORRIDOR} exact component={Corridor} history={props.history}/>
                    <Route path={locationType.PATIO} exact component={Patio} history={props.history}/>
                    <Route path={locationType.ESCAPE} exact component={Escape} history={props.history}/>
                </Switch>

            </div>
        </Beforeunload>
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
        storeUser: (user) => {
            console.log('################ storing user ################');
            dispatch(authAC.store_user(user));
        },
        noticeNotEscaping: () => dispatch(statusAC.notice_not_escaping()),
        setDefaultStatus: () => dispatch(statusAC.set_default()),
        setDefaultAuth: () => dispatch(authAC.set_default()),
        setDefaultRooms: () => dispatch(roomsAC.set_default()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);