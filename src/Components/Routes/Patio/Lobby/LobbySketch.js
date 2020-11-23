import React from "react";
import Sketch from "react-p5";
import {rdb_update_position} from "../../../../firebase/realtimeDB/rooms";

let CANVAS_SIZE;
let position = null;

const LobbySketch = props => {
    console.log('[LobbySketch]');
    CANVAS_SIZE = {width: window.innerWidth/2, height: window.innerHeight/2};
    if(props.roomData) {
        if (props.roomData[props.uid]) {
            position = props.roomData[props.uid].avatars.position;
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

        if (props.roomData) {
            Object.keys(props.roomData).forEach((user)=>{
                p5.ellipse(props.roomData[user].avatars.position.x, props.roomData[user].avatars.position.y, 50, 50);
            })
        }
    }

    return <Sketch style={{}} setup={setup} draw={draw}/>
}

export default LobbySketch;