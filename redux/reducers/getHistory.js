import { FETCHING_HISTORY, FETCH_HISTORY_FAILURE, FETCH_HISTORY_SUCCESS,  } from '../actions/getHistory'

const initialState = {
    history: [],
    isFetching: false,
    error: false
}

export default function historyReducer(state = initialState, action) {

    switch (action.type) {
        case FETCHING_HISTORY:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_HISTORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                history: action.data
            }
        case FETCH_HISTORY_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}   