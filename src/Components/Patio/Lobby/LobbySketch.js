import React from "react";
import Sketch from "react-p5";
import {rdb} from "../../../firebase/firebaseInit";
import {rdb_update_position} from "../../../firebase/rdb_rooms/rooms";

let CANVAS_SIZE;



const LobbySketch = props => {
    CANVAS_SIZE = {width: props.vw/2, height: props.vh/2};
    const position = props.snapshot.avatars[props.uid].position;
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


        if (props.aR) {position.x = position.x + 10};
        if (props.aL) {position.x = position.x - 10};
        if (props.aU) {position.y = position.y - 10};
        if (props.aD) {position.y = position.y + 10};

        rdb.ref('/rooms/' + props.myRoomId + '/avatars/' + props.uid + '/position')
            .set({
                x: position.x,
                y: position.y
            })

        // console.log(props.snapshot.avatars)
        // console.log(props.snapshot)
        Object.keys(props.snapshot.avatars).map((user)=>{
            // console.log();
            p5.ellipse(props.snapshot.avatars[user].position.x, props.snapshot.avatars[user].position.y, 50, 50);
        })
    }

    return <Sketch style={{}} setup={setup} draw={draw}/>
}

export default LobbySketch;