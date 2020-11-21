import React from 'react';
import {Route, Switch} from "react-router-dom";
import {locationType} from "../../utils/constatns";

import Home from "./Home/Home";
import Foyer from "./Foyer/Foyer";
import Corridor from "./Corridor/Corridor";
import Patio from "./Patio/Patio";


const Routes = props => {
    return <Switch>
        <Route path={locationType.HOME} exact component={Home} history={props.history}/>
        <Route path={locationType.FOYER} exact component={Foyer} history={props.history}/>
        <Route path={locationType.CORRIDOR} exact component={Corridor} history={props.history}/>
        <Route path={locationType.PATIO} exact component={Patio} history={props.history}/>
    </Switch>;
};

export default Routes;