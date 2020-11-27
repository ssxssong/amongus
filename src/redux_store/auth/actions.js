export const actionTypes = {
    SET_LOGGEDIN: 'SET_LOGGEDIN',
    STORE_USER: 'STORE_USER',
    SET_DEFAULT: 'SET_DEFAULT',
}

export const actionCreator = {
    set_loggedIn: () => {
        return {type: actionTypes.SET_LOGGEDIN}
    },
    store_user: (user) => {
        return {type: actionTypes.STORE_USER, user: user}
    },
    set_default: () => {
        return {type: actionTypes.SET_DEFAULT}
    },
}
