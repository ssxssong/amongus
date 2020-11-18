import React, {useState} from 'react';
import classes from './Foyer.module.css';
import {connect} from 'react-redux';

import CreateGame from "./CreateGame/CreateGame";
import FindGame from "./FindGame/FindGame";
import Status from "./Status/Status";
import Header from "../Neutral/Header/Header";

import CreateSetting from "./CreateGame/CreateSetting/CreateSetting";
import {actionCreator as statusAC} from "../../rootStore/status/actions";
import {locationType} from "../../constants/constatns";


const Foyer = props => {
    console.log('[Foyer]');
    props.located !== locationType.FOYER && props.history.replace(props.located);
    const [mod, setMod] = useState(true)
    const [nick, setNick] = useState(props.nickname);
    const inputChangedHandler = (event) => {setNick(event.target.value);};
    const modToggler = () => setMod(!mod);

    let foyer = null;
    if (mod) {
        foyer = (
            <>
                <Header history={props.history}/>
                <div className={classes.Foyer}>
                    <input className={classes.NicknameInput}
                           value={nick}
                           onChange={(e)=>inputChangedHandler(e)}
                           type="text"
                           placeholder='enter your nickname'/>
                    <CreateGame nickname={nick} history={props.history}
                                modToggle={modToggler}/>
                    <FindGame nickname={nick} history={props.history}/>
                    <Status/>
                    <button onClick={()=>{
                        props.setLocation(locationType.HOME);
                        props.history.push(locationType.HOME);
                    }}>back</button>
                </div>
            </>
        )
    } else {
        foyer = <CreateSetting nickname={nick} history={props.history} modToggle={modToggler}/>;
    }

    return (<>{foyer}</>);
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        position: state.status.position,
        nickname: state.status.nickname,
        located: state.status.located
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storePosition: (position) => dispatch(statusAC.store_Position(position)),
        deleteMyRoomId: ()=> dispatch(statusAC.deleteMyRoomId()),
        deleteRoomData: () => dispatch(statusAC.deleteRoomData()),
        setLocation: (location) =>dispatch(statusAC.set_location(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foyer);
