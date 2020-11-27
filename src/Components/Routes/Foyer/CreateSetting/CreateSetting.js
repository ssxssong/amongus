import React, {useState} from 'react';
import classes from './CreateSetting.module.css';
import {connect} from "react-redux";
import {actionCreator as statusAC} from "../../../../redux_store/status/actions";
import {locationType} from "../../../../const/const";
import {fs_createRoom} from "../../../../firebase/firestore/rooms";
import {rdb_setRoomData_user} from "../../../../firebase/realtimeDB/rooms";

const CreateSetting = props => {
    const [setting, setSetting] = useState({
        imposter: {value: 2, display:'Imposter', max:3, min:1},
        maxUser: {value: 10, display:'Max Users', max:10, min:6},
        speed: {value: 1, display:'Speed', max:10, min:1},
        vision: {value: 1, display:'Vision', max:10, min:1},
    })

    const addValue = (key) => {
        const ref = {...setting};
        if (ref[key].value !== ref[key].max ) {
            ref[key].value ++;
            setSetting(
                {...ref}
            );
        }
    }

    const subValue = (key) => {
        const ref = {...setting};
        if (ref[key].value !== ref[key].min) {
            ref[key].value--;
            setSetting(
                {...ref}
            );
        }
    }

    const create = async () => {
        const data = {
            users: [{
                uid: props.user.uid,
                nickname: props.nickname,
                displayName: props.user.displayName
            }],
            setting: setting,
        };
        const myRoomId = await fs_createRoom(data)
        await rdb_setRoomData_user(myRoomId, props.user.uid)
        props.storeMyRoomId(myRoomId)
        props.setLocation(locationType.PATIO)
    }

    let tempKey = 0
    return (
        <div className={classes.CreateSetting}>
            <div className={classes.Settlement}>
                {Object.keys(setting).map((key)=>{
                    tempKey++;
                    return <div className={classes.List} key={tempKey}>
                            <div className={classes.name}>{setting[key].display}</div>
                            <div className={classes.ControlWrap}>
                                <button onClick={()=>subValue(key)}>down</button>
                                <div className={classes.value}>{setting[key].value}</div>
                                <button onClick={()=>addValue(key)}>up</button>
                            </div>
                        </div>;
                })}
            </div>
            <button onClick={create}>Create Room</button>
            <button onClick={props.modToggle}>back</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        nickname: state.status.nickname,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeMyRoomId: (roomId) => dispatch(statusAC.store_myRoomId(roomId)),
        setLocation: (location)=> dispatch(statusAC.set_location(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetting);