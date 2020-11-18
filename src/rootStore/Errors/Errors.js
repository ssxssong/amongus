export const errorTypes = {
    ROOM_IS_FULL: 'ROOM_IS_FULL'
};

export const errorCreators = {
    err_roomIsFull: ()=> {
        return {type: errorTypes.ROOM_IS_FULL}
    }
}

const initialState = {
    errors : []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case errorTypes.ROOM_IS_FULL:
            const err = state.errors
            err.push(errorTypes.ROOM_IS_FULL)
            return {
                ...state,
                errors: err
            };
    }

    return state;
}

export {reducer};