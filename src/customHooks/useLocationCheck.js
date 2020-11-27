import {useEffect} from "react";

const useLocationCheck = (locatedAt, here, history) => {
    useEffect(()=>{
        history.push(locatedAt)
    }, [locatedAt, here])
}

export default useLocationCheck