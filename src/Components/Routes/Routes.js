import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import {locationType} from "../../const/const";

import Home from "./Home/Home";
import Foyer from "./Foyer/Foyer";
import Corridor from "./Corridor/Corridor";
import Patio from "./Patio/Patio";
import {connect} from "react-redux";

const Routes = props => {
    return <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            {props.user && <Route path={locationType.FOYER} exact component={Foyer}/>}
            {props.user && <Route path={locationType.CORRIDOR} exact component={Corridor}/>}
            {props.user && <Route path={locationType.PATIO} exact component={Patio}/>}
            <Route path={locationType.HOME} exact component={Home}/>
        </Switch>
    </Suspense>
};


const MSTP = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(MSTP)(Routes);