import React, {useState, useEffect} from 'react'
import { View, Text, Button, ScrollView, RefreshControl, TouchableHighlight, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import {getUsers, clearSession} from '../store/action'
import ButtonComponent from '../components/Button'

const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = {getUsers, clearSession}

const Home = (props) => {
    console.log(props.users, '???????????????????')
    const [refreshing, setRefreshing] = useState(false)

    const offSession = async () => {
        await props.clearSession(props.loggedUser)
    }

    useEffect(() => {
        console.log('MOUNT')
    }, [])

    useEffect(() => {
        return () => {
            offSession()
            console.log('UNMOUNT Home')
        }
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        props.getUsers(props.loggedUser.username)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }

    return (
        <View style={{padding: 10, height: Dimensions.get('screen').height/1.1}}>
            <ScrollView style={{height : '70%'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()}/>}>
                <Text style={{textAlign: "center", borderBottomWidth:2}}>LIST ONLINE USER</Text>
                {
                    props.users && 
                    props.users.map((user, index) => {
                        if(user.status){
                            return (
                                <TouchableHighlight key={index} onPress={() => props.navigation.navigate('ChatRoom', {partner : user})}>
                                    <View style={{margin: 10, paddingBottom: 10, borderBottomColor: 'grey', borderBottomWidth: 3, flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                                        <Text>{user.username}</Text>
                                        <Text style={{padding: 5, backgroundColor: 'green', borderRadius: 50, color: 'white'}}> ONLINE </Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        } else return null
                    })
                }
            </ScrollView>
            <View style={{padding : 10, height: '10%'}}>
                <ButtonComponent data={{
                    buttonColor : "maroon",
                    buttonTitle : "logout",
                    disabledButton : false,
                    triggerFunction : offSession
                }}/>
            </View>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
