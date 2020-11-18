import React from 'react';
import {connect} from 'react-redux';
import {actionCreator} from "../../../rootStore/status/actions";


const CreateGame = props => {
    console.log('[CreateGame]');
    return <button onClick={()=> {
        props.modToggle();
        props.storeNickName(props.nickname);
    }} disabled={!props.user}>Create Game</button>;
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeNickName: (nickname) => dispatch(actionCreator.storeNickName(nickname))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);