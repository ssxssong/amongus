import React, {useState, useEffect} from 'react';
import classes from './KeyManager.module.css';

const KeyManager = props => {
    const useKeyPress = (targetKey) => {
        const [keyPressed, setKeyPressed] = useState(false);
        const downHandler = ({ key }) => { if (key === targetKey) { setKeyPressed(true); } }
        const upHandler = ({ key }) => { if (key === targetKey) { setKeyPressed(false); } }

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
    }

    // keys
    const ArrowRight = useKeyPress('ArrowRight');
    const ArrowLeft = useKeyPress('ArrowLeft');
    const ArrowUp = useKeyPress('ArrowUp');
    const ArrowDown = useKeyPress('ArrowDown');


    return (
        <div className={classes.KeyManager} tabIndex='0'>
            <props.component
                AR={ArrowRight} AL={ArrowLeft} AU={ArrowUp} AD={ArrowDown}
                roomData={props.roomData}
                uid={props.uid}
                myRoomId={props.myRoomId}
                myPosition={props.myPosition}/>
        </div>
    );
};

export default KeyManager;