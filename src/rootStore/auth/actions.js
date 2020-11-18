export const actionTypes = {
    SIGN_IN: 'SIGN_IN'
}

export const actionCreator = {
    store_user: (user)=> {
        return {type: actionTypes.SIGN_IN, user: user}
    }
}