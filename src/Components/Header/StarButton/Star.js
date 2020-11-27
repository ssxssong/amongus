import React from 'react';
import Sketch from "react-p5";
import {star} from "../../../const/sketch_ingredients/star";
import {makePoly} from "../../../utils/draw";
import Scribble from "../../../utils/p5.scribble";

const scribbleARR_X = [];
const scribbleARR_Y = [];
star.coords.forEach((coord)=>{
    scribbleARR_X.push(coord.x)
    scribbleARR_Y.push(coord.y)
})

const Star = props => {

    const setup = (p5, canvasParentRef) => {
        p5.frameRate(10)
        const scribble = new Scribble(p5)
        p5.createCanvas(50, 50).parent(canvasParentRef);
        // p5.push();
        //
        // // p5.noFill();
        // // makePoly(p5, star.coords);
        // p5.stroke('rgb(255,255,255)');
        // p5.strokeWeight(0.3);
        // scribble.scribbleFilling( scribbleARR_X, scribbleARR_Y, 0.6, 10 );
        //
        //
        // p5.pop();
    }

    const draw = (p5) => {
        p5.clear();
        p5.scale(3);
        p5.translate(-4, -17);
        const scribble = new Scribble(p5)
        p5.stroke('rgb(255,255,255)');
        p5.strokeWeight(0.3);
        scribble.scribbleFilling( scribbleARR_X, scribbleARR_Y, 0.6, 10 );
    }

    return <Sketch setup={setup} draw={draw}/>
}

export default React.memo(Star)