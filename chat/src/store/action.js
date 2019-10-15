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
    return dispatch => {
        db.collection('users').where('username', '==', query).onSnapshot(async function (doc){
            console.log(doc.size, '++++++++++++')
            if(doc.size === 0){
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
                doc.forEach((loggedUser) => {
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
        
        })
    }
}

export function sendChat(chat, author, partner){
    return async dispatch => {
        console.log('author: ', author);
        let sender = await db.collection('users').where('username', '==', author).get()
        let currentUser;
        let id;
        sender.forEach(doc => {
            currentUser = doc.data()
            id = doc.id
        })
        currentUser.chat.push({
            date : new Date().toString(),
            message : chat,
            to : partner
        })
        delete currentUser.author
        console.log(currentUser, '<<<<<<<<<<<<<<<<<')

        await db.collection('users').doc(id).set(currentUser)
        console.log('updateSender: ', updateSender, '##########################');


        dispatch({type: ''})
    }
}