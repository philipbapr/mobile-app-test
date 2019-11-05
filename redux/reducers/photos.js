import { GET_PHOTOS } from '../actions/photos';

const initialState = {
    photos: []
}

export default function todosReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: action.photos
            }
        default:
            return state
    }
}   