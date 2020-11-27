import {useEffect, useState} from "react";

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

export default useKeyPress