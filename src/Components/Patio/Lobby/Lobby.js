import React, {useState, useEffect} from 'react';
import classes from './Lobby.module.css';
import LobbySketch from "./LobbySketch";
import {connect} from "react-redux";
import {rdb} from "../../../firebase/firebaseInit";

const Lobby = props => {
    const useKeyPress = (targetKey) => {
        const [keyPressed, setKeyPressed] = useState(false);
        const downHandler = ({key}) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        }
        const upHandler = ({key}) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        }

        useEffect(() => {
            window.addEventListener('keydown', downHandler);
            window.addEventListener('keyup', upHandler);
            // Remove event listeners on cleanup
            return () => {
                window.removeEventListener('keydown', downHandler);
                window.removeEventListener('keyup', upHandler);
            };
        }, []); // Empty array ensures that effect is only run on mount and unmount

        return keyPressed;
    };

    // keys
    const ArrowRight = useKeyPress('ArrowRight');
    const ArrowLeft = useKeyPress('ArrowLeft');
    const ArrowUp = useKeyPress('ArrowUp');
    const ArrowDown = useKeyPress('ArrowDown');

    let showLobby = false;
    if (props.snapshot.avatars !== undefined) {
        if (props.snapshot.avatars[props.uid] !== undefined) {
            showLobby = true;
        }
    }

    return <div className={classes.Lobby} tabIndex='0'>
        {showLobby && <LobbySketch
            uid={props.uid}
            myRoomId={props.myRoomId}
            myPosition={props.myPosition}
            snapshot={props.snapshot}
            aR={ArrowRight} aL={ArrowLeft} aU={ArrowUp} aD={ArrowDown}
            vw={window.innerWidth}
            vh={window.innerHeight}/>}
    </div>;
};

const mapStateToProps = state => {
    return {
        uid: state.auth.user.uid,
        myRoomId: state.status.myRoomId,
    }
}

export default connect(mapStateToProps)(Lobby);