import db from '../config/firebase'

export function getUsers(currentUser){
    return dispatch => {
        db.collection('users').onSnapshot(function (doc){
            let users = []
            doc.forEach((doc) => {
                if(doc.data().username !== currentUser){
                    users.push(doc.data())
                }
            })
            console.log(users, '========================')
            dispatch({
                type: 'get all users',
                payload: users
            })
        })
    }
}

export function loginUser(query){
    return async dispatch => {
        let user = await db.collection('users').where('username', '==', query).get()
        console.log(user.size, '++++++++++++')
        if(user.size === 0){
            let newUser = await db.collection('users').add({
                chat : [],
                username : query,
                status : true
            })
            console.log('newUser: ', newUser);
            dispatch({
                type : 'login user',
                payload : newUser
            })
        } else {
            let currentUser;
            user.forEach((loggedUser) => {
                currentUser = loggedUser.data()
                currentUser.id = loggedUser.id
                currentUser.status = true
            })
            let updateUser = await db.collection('users').doc(currentUser.id).update({
                status : true
            })
            console.log('updateUser: ', updateUser);
            dispatch({
                type : 'login user',
                payload : currentUser
            })
        }
    }
}