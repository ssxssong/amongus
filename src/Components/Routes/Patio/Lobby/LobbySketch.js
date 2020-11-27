import React, {useEffect} from "react";
import Sketch from "react-p5";
import useKeyPress from "../../../../customHooks/useKeyPress";
import {
    rdb_room_listener,
    rdb_update_position,
    rdb_unsubscribe_room_listener,
    LOBBY
} from "../../../../firebase/realtimeDB/rooms";
import {connect} from "react-redux";
import {avatarDefaults} from "../../../../const/sketch_ingredients/avatarDefault";
import {rdb} from "../../../../firebase/Init";

let CANVAS_SIZE;
let position = avatarDefaults.DEFAULT_POSITION
let users = null;

const LobbySketch = props => {
    console.log('[LobbySketch]');

    useEffect(()=>{
        rdb_room_listener(props.myRoomId, (snapshot) => {
            if (snapshot.val() &&
                snapshot.val().users &&
                snapshot.val().users[props.user.uid] &&
                snapshot.val().users[props.user.uid].avatar &&
                snapshot.val().users[props.user.uid].avatar.position) {
                position = snapshot.val().users[props.user.uid].avatar.position
                users = snapshot.val().users;
            }
        })

        return rdb_unsubscribe_room_listener()
    }, [])

    // keys
    const ArrowRight = useKeyPress('ArrowRight');
    const ArrowLeft = useKeyPress('ArrowLeft');
    const ArrowUp = useKeyPress('ArrowUp');
    const ArrowDown = useKeyPress('ArrowDown');

    CANVAS_SIZE = {width: window.innerWidth/2, height: window.innerHeight/2};
    // if(props.roomData) {
    //     if (props.roomData[props.uid]) {
    //         if (props.roomData[props.uid].avatars) position = props.roomData[props.uid].avatars.position;
    //     }
    // }

    const setup = (p5, canvasParentRef) => {
        p5.frameRate(60);
        let cnv = p5.createCanvas(CANVAS_SIZE.width, CANVAS_SIZE.height).parent(canvasParentRef);
        p5.background(255);
        cnv.id('test id');
        cnv.addClass('test_class_name');
    }

    const draw = (p5) => {
        p5.clear();
        p5.background(255);


        if (ArrowRight) {position.x = position.x + 10}
        if (ArrowLeft) {position.x = position.x - 10}
        if (ArrowUp) {position.y = position.y - 10}
        if (ArrowDown) {position.y = position.y + 10}

        rdb_update_position(props.myRoomId, props.user.uid, position).then()

        if (users) {
            Object.keys(users).forEach((uid) => {
                if (users[uid].avatar) {
                    p5.ellipse(users[uid].avatar.position.x, users[uid].avatar.position.y, 50, 50);
                }
            })
        }
    }
    return <Sketch style={{}} setup={setup} draw={draw}/>
}


const MSTP = state => {
    return {
        user: state.auth.user,
        locatedAt: state.status.locatedAt,
        myRoomId: state.status.myRoomId
    }
}

export default connect(MSTP, )(LobbySketch)