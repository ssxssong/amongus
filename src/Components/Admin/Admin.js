import React, {useState} from 'react';
import {fs_clear_db} from "../../firebase/firestore/rooms";
import {rdb_clear_db} from "../../firebase/realtimeDB/rooms";
import {actionCreator as statusAC} from "../../redux_store/status/actions";
import {connect} from "react-redux";
import {locationType} from "../../utils/constatns";


const Admin = props => {
    const [once, setOnce] = useState(false);
    if(!once) {
        props.setLocation(locationType.ADMIN);
        setOnce(true);
    }
    return <div style={{zIndex:'9999'}}>
        <button onClick={()=>{
            fs_clear_db();
            rdb_clear_db();
        }}>CLEAR DATABASE(FS, RDB)</button>
        <button onClick={()=>{
            props.setLocation(locationType.HOME);
            props.history.push(locationType.HOME);
        }}>HOME</button>
    </div>
}


const mapDispatchToProps = dispatch => {
    return {
        setLocation: (location) => dispatch(statusAC.set_location(location)),
    }
}

export default connect(null, mapDispatchToProps)(Admin);