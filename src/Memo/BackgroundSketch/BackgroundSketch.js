import React from "react";
import Sketch from "react-p5";
import {getRandomIntInclusive} from '../../Utils/math'

let baseLength = null;
const BackgroundSketch = props => {

    let stellars = [];
    const setup = (p5, canvasParentRef) => {
        // create canvas with window size
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);

        // create stars
        window.innerWidth > window.innerHeight ? baseLength = window.innerWidth/2 : baseLength = window.innerHeight/2;
        for (let i=0; i<baseLength; i++) {
            const stellar = {
                position: {
                    x: getRandomIntInclusive(0, window.innerWidth),
                    y: getRandomIntInclusive(0, window.innerHeight)
                },
                lightDegree: getRandomIntInclusive(1, 3),
                speedDegree: getRandomIntInclusive(1, 3)
            }
            stellars.push(stellar)
        }
    }

    const draw = (p5) => {
        p5.clear();
        p5.noStroke();

        // draw stars
        stellars.forEach((star)=>{
            p5.fill('rgba(255,255,255, 0.3)');
            p5.circle(star.position.x, star.position.y, star.lightDegree*2);
            p5.fill('rgba(255,255,255, 0.5)');
            p5.circle(star.position.x, star.position.y, star.lightDegree*1.5);
            p5.fill('rgba(227,213,112,0.64)');
            p5.circle(star.position.x, star.position.y, star.lightDegree*1);
            p5.fill('rgba(255,255,255,0.8)');
            p5.circle(star.position.x, star.position.y, star.lightDegree*0.5);

            if (star.position.x <= window.innerWidth/2) {
                star.position.x = star.position.x - (window.innerWidth/2 - star.position.x)*star.speedDegree*0.0001;
            } else {
                star.position.x = star.position.x + (star.position.x - window.innerWidth/2)*star.speedDegree*0.0001;
            }

            if (star.position.y <= window.innerHeight) {
                star.position.y = star.position.y - (window.innerHeight/2 - star.position.y)*star.speedDegree*0.0001;
            } else {
                star.position.y = star.position.y + (star.position.y - window.innerHeight/2)*star.speedDegree*0.0001;
            }

            if (star.position.x > window.innerWidth || star.position.y > window.innerHeight) {
                stellars.splice(stellars.indexOf(star), 1)
                const stellar = {
                    position: {
                        x: getRandomIntInclusive(window.innerWidth/2-10, window.innerWidth/2+10),
                        y: getRandomIntInclusive(window.innerHeight/2-10, window.innerHeight/2+10)
                    },
                    lightDegree: getRandomIntInclusive(0, 3),
                    speedDegree: getRandomIntInclusive(1, 3)
                }
                stellars.push(stellar);
            }
        })

        p5.fill(0)
        p5.ellipse(window.innerWidth/2, window.innerHeight/2, window.innerWidth/5, window.innerHeight/5);
    }

    return <Sketch setup={setup} draw={draw} />;
}

// memoizing
export default React.memo(BackgroundSketch);