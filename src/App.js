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
import Header from "./Components/Neutral/Header/Header";

let ctr = 0;
const App = (props) => {
    console.log('[App]');
    const [user] = useAuthState(auth);
    useEffect(()=>{
        (user && !props.stored) && props.storeUser(user);
    });

    return (
        <>
            {/*<div className={classes.ReduxState}>*/}
            {/*    {props.user ? (*/}
            {/*        <>*/}
            {/*            <div>{props.user.displayName}</div>*/}
            {/*            <div>{props.position}</div>*/}
            {/*            <div>{props.myRoomId}</div>*/}
            {/*            <button onClick={()=>test(props.myRoomId)}>TEST</button>*/}
            {/*        </>*/}
            {/*    ) : <div>waiting for authentication</div>}*/}
            {/*</div>*/}
            <div className={classes.App}>
                <div className={classes.BackgroundSketch}>
                    <BackgroundSketch/>
                </div>
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
        rooms: state.rooms.roomList,
        position: state.status.position,
        myRoomId: state.status.myRoomId,
        nickname: state.status.nickname
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUser: (user) => dispatch(actionCreator.store_user(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);