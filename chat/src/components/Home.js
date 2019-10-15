import React, {useState} from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import {connect} from 'react-redux'
import {getUsers} from '../store/action'

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = {getUsers}

const Home = (props) => {

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)
        props.getUsers(props.loggedUser)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }

    return (
        <View style={{padding: 10}}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()}/>}>
                {
                    props.users && 
                    props.users.map((user, index) => {
                        return (
                            <View key={index} style={{margin: 10, paddingBottom: 10, borderBottomColor: 'grey', borderBottomWidth: 3, flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                                <Text>{user.username.toUpperCase()}</Text>
                                {
                                    user.status 
                                    && 
                                    <Text style={{padding: 5, backgroundColor: 'green', borderRadius: 50, color: 'white'}}> ONLINE </Text>
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
