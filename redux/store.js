import { createStore, combineReducers, applyMiddleware } from 'redux'
import photos from './reducers/photos'
import location from './reducers/getLocation';
import history from './reducers/getHistory';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    photos,
    location,
    history
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store;
