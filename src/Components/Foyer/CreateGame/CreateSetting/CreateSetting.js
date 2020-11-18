import React, {useState} from 'react';
import classes from './CreateSetting.module.css';
import {connect} from "react-redux";
import {fs_createRoom} from "../../../../firebase/rooms/rooms";
import {actionCreator as statusAC, positionType} from "../../../../rootStore/status/actions";
import {locationType} from "../../../../constants/constatns";

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

    console.log(props.nickname);
    const create = () => {
        const params = {
            user: props.user,
            nickname: props.nickname,
            setting: setting,
        }
        fs_createRoom(
            params,
            {
                storeMyRoomId: props.storeMyRoomId,
                go: ()=> {
                    props.setLocation(locationType.PATIO);
                    props.history.push(locationType.PATIO);
                }
            });
    }

    let tempKey = 0
    return (
        <div className={classes.CreateSetting}>
            <div className={classes.Settlement}>
                {Object.keys(setting).map((key)=>{
                    tempKey++;
                    return (
                        <div className={classes.List} key={tempKey}>
                            <div className={classes.name}>{setting[key].display}</div>
                            <div className={classes.ControlWrap}>
                                <button onClick={()=>subValue(key)}>down</button>
                                <div className={classes.value}>{setting[key].value}</div>
                                <button onClick={()=>addValue(key)}>up</button>
                            </div>
                        </div>
                    );
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
        storeMyRoomId: (roomId) => dispatch(statusAC.setMyRoomId(roomId)),
        setLocation: (location)=> dispatch(statusAC.set_location(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetting);