import React, {useEffect, useState} from 'react'
import { View, Text, Button, TextInput, Alert, ActivityIndicator } from 'react-native'
import {connect} from 'react-redux'
import {
    loginUser,
    getUsers,
    clearSession
} from '../store/action'

import Navigation from '../navigation/index'
import ButtonComponent from '../components/Button'
import TextInputComponent from '../components/TextInput'

let mapStateToProps = state => {
    return {
        ...state
    }
}

let mapDispatchToProps = {
    loginUser,
    getUsers,
    clearSession
}



const LandingPage = (props) => {
    console.log(props.loggedUser, '========================LANDING PAGE')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    
    
    useEffect(() => {
        console.log('MOUNT Landing Page')
    }, [])

    useEffect(() => {
        return () => {
            console.log('UNMOUNT Landing Page')
        }
    }, [])

    const action = () => {
        setLoading(true)
        props.loginUser(username)
        props.getUsers(username)
        setUsername('')
        setLoading(false)
    }

    if(!props.loggedUser){
        return (
            <View>
                <TextInputComponent data={{
                    value : username,
                    placeholder : 'Input Username',
                    style : {borderColor : 'grey', borderWidth: 1, borderRadius: 5, margin: 20},
                    triggerFunction : (text) => {
                        setUsername(text)    
                    }
                }}/>
                <View style={{margin : 10,}}>
                    {
                        loading ?
                        <ActivityIndicator></ActivityIndicator> :
                        <ButtonComponent data={{
                            buttonColor : "blue",
                            buttonTitle : "login",
                            disabledButton : loading,
                            triggerFunction : () => {
                                action()
                            }
                        }}/>

                    }
                </View>
            </View>
        )
    } else {
        return <Navigation/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
