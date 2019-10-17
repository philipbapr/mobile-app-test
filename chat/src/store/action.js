import db from '../config/firebase'
import  {Alert} from 'react-native'

export function getUsers(currentUser){
    return dispatch => {
        db.collection('users').onSnapshot(function (doc){
            let users = []
            doc.forEach((doc) => {
                if(doc.data().username !== currentUser){
                    users.push(doc.data())
                }
            })
            // console.log(users, '========================')
            dispatch({
                type: 'get all users',
                payload: users
            })
        })
    }
}

export function loginUser(query){
    return async dispatch => {
        console.log('query: ', query);
        if(query){
            let user = await db.collection('users').where('username', '==', query).get()
            if(user.size === 0){
                let newUser = await db.collection('users').add({
                    chat : [],
                    username : query,
                    status : true
                })
                console.log('newUser: ', newUser.id);
                user = await db.collection('users').doc(newUser.id).get()
                console.log('user: ', user.data());
                dispatch({
                    type : 'login user',
                    payload : user.data()
                })
            } else {
                let currentUser;
                user.forEach((loggedUser) => {
                    currentUser = loggedUser.data()
                    currentUser.id = loggedUser.id
                    currentUser.status = true
                })
                await db.collection('users').doc(currentUser.id).update({
                    status : true
                })
                // console.log('updateUser: ', updateUser);
                dispatch({
                    type : 'login user',
                    payload : currentUser
                })
            }
        } else Alert.alert('username are required')
    }
}

export function sendChat(chat, author, partner){
    return async dispatch => {
        if(chat){
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
    
            await db.collection('users').doc(id).set(currentUser)
            let updatedUser = await db.collection('users').doc(id).get()
            console.log('updatedUser: ', updatedUser.data(), '====================UPDATED USER');
    
            dispatch({type: 'send chat', payload : updatedUser.data()})
        }
    }
}

export function clearSession(user){
    return async dispatch => {
        user.status = false
        let id = user.id
        delete user.id
        dispatch ({type : 'clear session'})
        await db.collection('users').doc(id).set(user)
        console.log('clear session')
    }
}