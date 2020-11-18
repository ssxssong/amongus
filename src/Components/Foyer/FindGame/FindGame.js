import React from 'react';
import {connect} from "react-redux";
import {actionCreator as roomsAC} from "../../../rootStore/rooms/actions";
import {actionCreator as statusAC} from "../../../rootStore/status/actions";
import {locationType} from "../../../constants/constatns";


const FindGame = props => {
    const findGame = () => {
        props.storeNickName(props.nick);
        props.history.push(locationType.CORRIDOR);
    };

    return <button onClick={findGame} disabled={!props.user}>Find Game</button>;
};


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        nickname: state.status.nickname
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeNickName: (nickname) => dispatch(statusAC.storeNickName(nickname)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindGame);