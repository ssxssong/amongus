import React, {useEffect} from 'react';
import classes from './App.module.css';
import { Route, Switch } from 'react-router-dom';
import Intro from "./Components/Intro/Intro";
import BackgroundSketch from "./Memo/BackgroundSketch/BackgroundSketch";
import Foyer from "./Components/Foyer/Foyer";
import Patio from "./Components/Patio/Patio";
import Corridor from "./Components/Corridor/Corridor";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase/firebaseInit";
import {connect} from "react-redux";
import {actionCreator} from "./rootStore/auth/actions";
import {actionCreator as statusAC} from './rootStore/status/actions';
import {actionCreator as authAC} from './rootStore/auth/actions';
import {actionCreator as roomsAC} from './rootStore/rooms/actions';
import firebase from "firebase/app";
import {locationType} from "./constants/constatns";

const App = (props) => {
    console.log('[App]');
    const [user] = useAuthState(auth);
    useEffect(()=>{
        (user && !props.stored) && props.storeUser(user);
    });

    return (
        <>
            <div className={classes.App}>
                <div className={classes.BackgroundSketch}>
                    <BackgroundSketch/>
                </div>
                <div
                    style={{
                        color:'white',
                        position: 'absolute',
                        bottom: '10rem',
                        left: '1rem',
                        fontSize: '2rem'}}>
                    <div style={{color:'white', margin:'1rem'}}>user.uid         :
                        {props.user ? props.user.uid : ''}</div>
                    <div style={{color:'white', margin:'1rem'}}>user.displayName :
                        {props.user ? props.user.displayName : ''}</div>
                    <div style={{color:'white', margin:'1rem'}}>user.nickname    :
                        {props.user ? props.user.nickname : ''}</div>
                    <div style={{color:'white', margin:'1rem'}}>position         :
                        {props.position ? props.position : ''}</div>
                    <div style={{color:'white', margin:'1rem'}}>myRoomId         :
                        {props.myRoomId ? props.myRoomId : ''}</div>
                </div>
                <button
                    onClick={()=>{
                        firebase.auth().signOut()
                            .then(() => {
                                props.setDefautStatus();
                                props.setDefautAuth();
                                props.setDefautRooms();
                                window.localStorage.clear();
                                window.history.pushState(null, null, '/')
                                window.location.reload();
                            })
                            .catch((error) => console.log(error));
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0'
                    }}>
                    ESCAPE
                </button>

                <Switch>
                    <Route path='/' exact component={Intro}/>
                    <Route path='/foyer' exact component={Foyer} history={props.history}/>
                    <Route path='/corridor' exact component={Corridor} history={props.history}/>
                    <Route path='/patio' exact component={Patio} history={props.history}/>
                </Switch>



            </div>
        </>
    );
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        stored: state.auth.stored,
        position: state.status.position,
        myRoomId: state.status.myRoomId,
        nickname: state.status.nickname,
        located: state.status.located
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUser: (user) => dispatch(actionCreator.store_user(user)),
        setLocation: (location)=> dispatch(statusAC.set_location(location)),
        setDefautStatus: () => dispatch(statusAC.set_default()),
        setDefautAuth: () => dispatch(authAC.set_default()),
        setDefautRooms: () => dispatch(roomsAC.set_default()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);