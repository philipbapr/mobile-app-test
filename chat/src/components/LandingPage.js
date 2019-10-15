import React, {useEffect, useState} from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import {connect} from 'react-redux'
import {
    loginUser,
    getUsers
} from '../store/action'
import Home from './Home'

let mapStateToProps = state => {
    return {
        ...state
    }
}

let mapDispatchToProps = {
    loginUser,
    getUsers
}



const LandingPage = (props) => {
    
    const [username, setUsername] = useState('')

    useEffect(() => {
        if(!props.users && props.loggedUser){
            props.getUsers(props.loggedUser)
            console.log('---------------')
        }
    })

    if(!props.loggedUser){
        return (
            <View>
                <TextInput onChangeText={(text) => {
                    setUsername(text)
                    console.log(username)
                }} placeholder="Input Username" style={{borderColor : 'grey', borderWidth: 1, borderRadius: 5, margin: 20}}/>
                <View style={{margin : 10,}}>
                    <Button onPress={() => props.loginUser(username)} title="login"/>
                </View>
            </View>
        )
    } else {
        return <Home/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
