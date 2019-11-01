import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux'
import {sendChat} from '../store/action'
import TextInputComponent from '../components/TextInput'
import ChatBox from '../components/ChatBox'

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = {
    sendChat
}

const ChatRoom = (props) => {
    const {params} = props.navigation.state
    let {height, width} = Dimensions.get('screen')
    const [conversation, setConversation] = useState(null)
    const [chatInput, setChatInput] = useState('')

    useEffect(() => {
        // console.log(props.loggedUser, '=================>>>>>>>> DID MOUNT')
        if(params.partner.chat.length > 0 || props.loggedUser.chat.length > 0){
            // console.log('props.loggedUser.chat.length: ', props.loggedUser.chat.length);
            // console.log('params.partner.chat.length: ', params.partner.chat.length);
            let ourChat = []
            params.partner.chat.forEach((msg) => {
                if(msg.to === props.loggedUser.username) {
                    msg.author = params.partner.username
                    ourChat.push(msg)
                }
            })
            
            props.loggedUser.chat.forEach((msg) => {
                if(msg.to === params.partner.username) {
                    msg.author = props.loggedUser.username
                    ourChat.push(msg)
                }
            })

            if(ourChat.length > 0){
                ourChat.sort((a,b) => new Date(b.date) - new Date(a.date))
                setConversation(ourChat)
            }
        }
    },[props.loggedUser])

    useEffect(() => {
        return () => {
            console.log('UNMOUNT Chat Room')
        }
    }, [])

    return (
        <View style={{height: height/1.2}}>
            <View style={{borderBottomColor:'darkgrey', borderBottomWidth:3, height: height/1.4}}>
                <FlatList
                    data={conversation}
                    keyExtractor={({index}) => index}
                    renderItem={({item, index}) => {
                        if(item.author === props.loggedUser.username){
                            return (
                                <ChatBox data={{
                                    styleParent : {flexDirection: "row-reverse", justifyContent:'flex-start', alignItems: 'center', padding: 5},
                                    styleChild : {margin : 5, backgroundColor: 'lightgrey', padding : 10, borderRadius: 10},
                                    name : item.author,
                                    message : item.message
                                }}/>
                            )
                        } else {
                            return (
                                <ChatBox data={{
                                    styleParent : {flexDirection: "row", justifyContent:'flex-start', alignItems: 'center', padding: 5},
                                    styleChild : {margin : 5, backgroundColor: 'lightgreen', padding : 10, borderRadius: 10},
                                    name : item.author,
                                    message : item.message
                                }}/>
                            )
                        }
                    }}
                inverted
                />
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', position: 'absolute', padding: 10, width, bottom: 0}}>
                <TextInputComponent data={{
                    placeholder : "",
                    value : chatInput,
                    style : {borderColor : 'grey', borderWidth: 1, borderRadius: 5, margin: 10, width: width/1.2, height: height/15},
                    triggerFunction : (text) => {
                        setChatInput(text)
                    }
                }}/>
                <Button title=">" onPress={() => {
                    props.sendChat(chatInput, props.loggedUser.username, params.partner.username)
                    setChatInput('')
                }}/>
            </View>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
