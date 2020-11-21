import React from "react";
import classes from './Home.module.css';
import SignIn from "./SignIn/SignIn";
import Start from "./Start/Start";
import {connect} from "react-redux";

const Home = props => {
    return <div className={classes.Home}>
        <div className={classes.Title}>AMONG US</div>
        <div className={classes.SignIn}>
            {!props.user? <SignIn history={props.history}/> : <Start history={props.history}/>}
        </div>

    </div>;
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Home);
