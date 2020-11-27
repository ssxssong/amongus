export const makePoly = (p5, arr) => {
    p5.beginShape();
    for(const {x,y} of arr) p5.vertex(x,y);
    p5.endShape(p5.CLOSE);
}