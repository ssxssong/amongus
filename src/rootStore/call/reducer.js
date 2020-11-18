import {actionTypes} from "./actions";

const initialState = {
    onSnapshotCounter: 0,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COUNT_ONSNAPSHOT:
            return {
                ...state,
                onSnapshotCounter: state.onSnapshotCounter + 1
            };
        default: break;
    }
    return state;
}