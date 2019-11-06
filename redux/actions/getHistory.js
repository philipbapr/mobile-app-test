export const FETCHING_HISTORY = 'FETCHING_HISTORY';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';
export const FETCHING_SEARCH = 'FETCHING_SEARCH';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE';
export const SEARCH_RESULTS = 'SEARCH_RESULTS';


export function fetchHistory() {

    return (dispatch) => {
        dispatch(getHistory())

        return (fetch('https://images.funtravia.com/api/images'))
            .then(res => res.json())
            .then(json => {

                return (dispatch(getHistorySuccess(json.data)))
            })
            .catch(err => dispatch(getHistoryFailure(err)))
    }
}

export function getHistory() {

    return {
        type: FETCHING_HISTORY
    }
}

export function getHistorySuccess(data) {

    return {
        type: FETCH_HISTORY_SUCCESS,
        data
    }
}

export function getHistoryFailure() {
    return {
        type: FETCH_HISTORY_FAILURE
    }
}

export function searchResults(results) {
    return {
        type: SEARCH_RESULTS,
        results
    }
}