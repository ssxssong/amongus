import React from "react";
import classes from './Description.module.css';

export const Description = props => (
    <>
        <div className={classes.Description}>
            <p>This site copied the game <a href="https://en.wikipedia.org/wiki/Among_Us">'Among us'</a> published by <a href="https://www.innersloth.com/">InnerSloth</a></p>
            <p>for purpose of practice.</p>
        </div>
    </>
);
