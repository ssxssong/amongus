import React from "react";
import Sketch from "react-p5";
import {rdb} from "../../../../firebase/Init";
import {rdb_update_position} from "../../../../firebase/realtimeDB/rooms"

let CANVAS_SIZE;
let position = null;

const LobbySketch = props => {
    console.log('[LobbySketch]');
    CANVAS_SIZE = {width: window.innerWidth/2, height: window.innerHeight/2};
    if(props.roomData.avatars) {
        if (props.roomData.avatars[props.uid]) {
            position = props.roomData.avatars[props.uid].position;
            console.log(position);
        }
    }

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


        if (props.AR) {position.x = position.x + 10};
        if (props.AL) {position.x = position.x - 10};
        if (props.AU) {position.y = position.y - 10};
        if (props.AD) {position.y = position.y + 10};

        if (position) {
            rdb_update_position(props.myRoomId, props.uid, position);
        }

        if (props.roomData.avatars) {
            Object.keys(props.roomData.avatars).map((user) => {
                p5.ellipse(props.roomData.avatars[user].position.x, props.roomData.avatars[user].position.y, 50, 50);
                console.log(props.roomData.avatars)
            })
        }
    }

    return <Sketch style={{}} setup={setup} draw={draw}/>
}

export default LobbySketch;