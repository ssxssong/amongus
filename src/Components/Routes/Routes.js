import React from 'react';
import {Route, Switch} from "react-router-dom";
import {locationType} from "../../utils/constatns";

import Home from "./Home/Home";
import Foyer from "./Foyer/Foyer";
import Corridor from "./Corridor/Corridor";
import Patio from "./Patio/Patio";
import Admin from "../Admin/Admin";
import Test from "./Test/Test";

const Routes = props => {
    return <Switch>
        <Route path={locationType.TEST} exact component={Test} history={props.history}/>
        <Route path={locationType.FOYER} exact component={Foyer} history={props.history}/>
        <Route path={locationType.CORRIDOR} exact component={Corridor} history={props.history}/>
        <Route path={locationType.PATIO} exact component={Patio} history={props.history}/>
        <Route path={locationType.ADMIN} exact component={Admin} history={props.history}/>
        <Route path={locationType.HOME} exact component={Home} history={props.history}/>
    </Switch>;
};

export default Routes;