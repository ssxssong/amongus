export const actionTypes = {
    COUNT_ONSNAPSHOT: 'COUNT_ONSNAPSHOT'
}

export const actionCreator = {
    count_onSnapshot: () => {
        return {type: actionTypes.COUNT_ONSNAPSHOT}
    }
}