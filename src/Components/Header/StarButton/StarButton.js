import React, {useState, useEffect} from 'react';
import useMousePosition from "../../../customHooks/useMousePosition";
import Star from "./Star";
import classes from './StarButton.module.css';
import {signOut} from "../../../firebase/auth/auth";
import {actionCreator as statusAC} from "../../../redux_store/status/actions";
import {connect} from "react-redux";
import {locationType} from "../../../const/const";
import {Link} from "react-router-dom";
import {actionCreator as authAC} from "../../../redux_store/auth/actions";
import {actionCreator as roomsAC} from "../../../redux_store/rooms/actions";

const StarButton = props => {
    const [m, sM] = useState(false);
    const [b, sB] = useState(false);
    const [i, sI] = useState(false);
    const [co, setCo] = useState({
        x: 300, y: 300
    })

    const { x, y } = useMousePosition();

    const hold = ()=>{
        sM(!m)
    }

    useEffect(()=>{
        if (m && x && y) {
            setCo({
                x: x, y: y
            })
        }

        if (!m) {
            ((window.innerWidth - 70 < co.x) && (co.x < window.innerWidth - 10) &&
            (10 < co.y) && (co.y < 70)) && sB(true);
        }
    }, [m, x, y])


    return <>
        {m && <div className={classes.StarBox}/>}
        {b ? <>
                <Link className={classes.StarBox}
                      to={locationType.HOME}
                      style={{border:'none'}}
                      onMouseEnter={()=>{sI(!i)}}
                      onMouseLeave={()=>{sI(!i)}}
                      onClick={()=> {
                          signOut().then(()=>{
                              props.setDefaultAuth()
                              props.setDefaultRooms()
                              props.setDefaultStatus()
                          });
                      }}>
                    <div className={classes.star}>
                        <Star/>
                    </div>

                <h3 style={{
                    transition: 'all .2s ease-out',
                    opacity: `${i ? 1 : 0}`}}>SignOut</h3>
                </Link>
            </> :
            <button
                className={classes.StarButton}
                style={{
                    top: `${co.y}px`,
                    left: `${co.x}px`
                }}
                onClick={hold}
            >
                <Star/>
            </button>
        }
    </>;
}


const MDTP = dispatch => {
    return {
        setDefaultAuth: () => dispatch(authAC.set_default()),
        setDefaultRooms: () => dispatch(roomsAC.set_default()),
        setDefaultStatus: () => dispatch(statusAC.set_default()),
    }
}

export default connect(null, MDTP)(StarButton)