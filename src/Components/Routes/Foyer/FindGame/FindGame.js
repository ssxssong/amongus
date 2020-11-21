import React from 'react';
import {connect} from "react-redux";
import {actionCreator as roomsAC} from "../../../../redux_store/rooms/actions";
import {actionCreator as statusAC} from "../../../../redux_store/status/actions";
import {locationType} from "../../../../utils/constatns";


const FindGame = props => {
    const findGame = () => {
        props.storeNickName(props.nick);
        props.setLocation(locationType.CORRIDOR);
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
        setLocation: (location)=> dispatch(statusAC.set_location(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindGame);