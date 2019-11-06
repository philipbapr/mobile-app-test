import { GET_LOCATION } from '../actions/getLocation';

const initialState = {
    location: ''
}

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOCATION:
            return {
                ...state,
                location: action.location
            }
        default:
            return state
    }
}   