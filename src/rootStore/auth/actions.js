export const actionTypes = {
    SIGN_IN: 'SIGN_IN',
    SET_DEFAULT: 'SET_DEFAULT'
}

export const actionCreator = {
    store_user: (user)=> {
        return {type: actionTypes.SIGN_IN, user: user}
    },
    set_default: ()=> {
        console.log('setting deafault auth');
        return {type: actionTypes.SET_DEFAULT}
    },
}
