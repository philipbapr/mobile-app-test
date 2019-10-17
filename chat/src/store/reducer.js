const initState = {
    users : null,
    loggedUser : null
}

export default function reducer (state = initState, action){
    switch (action.type) {
        case 'get all users':
            return {
                ...state,
                users : action.payload
            }
        case 'login user' : 
            return {
                ...state,
                loggedUser : action.payload
            }
        case 'clear session' : 
            return {
                ...state,
                loggedUser : null,
                users : null
            }
        case 'send chat' : 
            return {
                ...state,
                loggedUser : action.payload
            }
        default:
            return state
    }
}