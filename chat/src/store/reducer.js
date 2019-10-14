const initState = {
    state : null
}

export default function reducer (state = initState, action){
    switch (action.type) {
        case '':
            return {
                ...state
            }
        default:
            return state
    }
}