import React from 'react';
import {connect} from 'react-redux';
import {actionCreator as statusAC} from "../../../../redux_store/status/actions";


const CreateGame = props => {
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
        storeNickName: (nickname) => dispatch(statusAC.store_nickName(nickname))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);