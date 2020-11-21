export const actionTypes = {
    STORE_USER: 'STORE_USER',
    SET_DEFAULT: 'SET_DEFAULT'
}

export const actionCreator = {
    store_user: (user)=> {
        return {type: actionTypes.STORE_USER, user: user}
    },
    set_default: ()=> {
        console.log('setting deafault auth');
        return {type: actionTypes.SET_DEFAULT}
    },
}
