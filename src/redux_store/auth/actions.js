export const actionTypes = {
    STORE_USER: 'STORE_USER',
    SET_DEFAULT: 'SET_DEFAULT',
    TRYING: 'TRYING',
    FAILED: 'FAILED',
}

export const actionCreator = {
    store_user: (user)=> {
        return {type: actionTypes.STORE_USER, user: user}
    },
    set_default: ()=> {
        console.log('setting deafault auth');
        return {type: actionTypes.SET_DEFAULT}
    },
    set_trying: ()=> {
        return {type: actionTypes.TRYING}
    },
    set_failed: ()=> {
        return {type: actionTypes.FAILED}
    },
}
