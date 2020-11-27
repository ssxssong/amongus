import React, {useState} from 'react';
import {locationType} from "../../../const/const";
import {connect} from "react-redux";
import useLocationCheck from "../../../customHooks/useLocationCheck";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import classes from './Foyer.module.css';
import CreateSetting from "./CreateSetting/CreateSetting";
import CreateGame from "./CreateGame/CreateGame";
import FindGame from "./FindGame/FindGame";

const Foyer = props => {
    useLocationCheck(props.locatedAt, locationType.FOYER, props.history);
    const [mod, setMod] = useState(true);
    const [nick, setNick] = useState(props.nickname);

    const modToggler = () => setMod(!mod);

    let foyer = null;

    if (mod) {
        foyer = <div className={classes.Foyer}>
            <input className={classes.NicknameInput}
                   value={nick}
                   onChange={(event) => setNick(event.target.value)}
                   type="text"
                   placeholder='enter your nickname'/>
            <CreateGame nickname={nick} history={props.history}
                        modToggle={modToggler}/>
            <FindGame nick={nick} history={props.history}/>
            <button onClick={() => {
                props.setLocation(locationType.HOME);
            }}>back
            </button>
        </div>;

    } else {
        foyer = <CreateSetting nickname={nick} history={props.history} modToggle={modToggler}/>;
    }

    return (<>{foyer}</>);
};

const MSTP = state => {
    return {
        locatedAt: state.status.locatedAt,
        nickname: state.status.nickname,
    }
}

const MDTP = dispatch => {
    return {
        setLocation: (location)=>dispatch(statusAC.set_location(location))
    }
}

export default connect(MSTP, MDTP)(Foyer)