import db from '../config/firebase'

export function loginUser(query){
    return async dispatch => {
        try {
            let currentUser = db.collection('user').get()
            dispatch({
                type: '',
                payload: ''
            })
            
        } catch (error) {
            console.log('error: ', error);
            console.log('error: ', error.response);
        }
    }
}