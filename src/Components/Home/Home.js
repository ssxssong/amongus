import classes from './Home.module.css';
import SignIn from "../Intro/SignIn/SignIn";
import React from "react";
import {connect} from "react-redux";
import {actionCreator as statusAC} from "../../rootStore/status/actions";
import {locationType} from "../../constants/constatns";

const Home = props => {
    // if(!props.connected) {
    //     props.history.replace(locationType.HOME);
    // }

    return <div className={classes.Home}>
        <div className={classes.Title}>AMONG US</div>
        <SignIn setLocation={props.setLocation} history={props.history}/>
    </div>;
};

const mapStateToProps = state => {
    return {
        connected: state.status.connected
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setConnection: ()=>dispatch(statusAC.set_connection()),
        setLocation: (location)=> dispatch(statusAC.set_location(location)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
