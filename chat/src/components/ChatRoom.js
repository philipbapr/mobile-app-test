import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {sendChat} from '../store/action'

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
        if(params.partner.chat.length > 0 || props.loggedUser.chat.length > 0){
            let ourChat = []
            params.partner.chat.forEach((msg) => {
                console.log(msg['to'])
                if(msg.to === props.loggedUser.username) {
                    
                    msg.author = params.partner.username
                    ourChat.push(msg)
                } else {
                    console.log('00000000000000000000')
                }
            })
            props.loggedUser.chat.forEach((msg) => {
                if(msg.to === params.partner.username) {
                    msg.author = props.loggedUser.username
                    ourChat.push(msg)
                }
            })

            if(ourChat.length > 0){
                ourChat.sort((a,b) => new Date(a.date) - new Date(b.date))
                setConversation(ourChat)
            }
        }
    },[])
    



    return (
        <View style={{height: height/1.2}}>
            {
                conversation &&
                conversation.map((msg, index) => {
                    if(msg.author === props.loggedUser.username){
                        return (
                            <View key={index} style={{flexDirection: "row-reverse", justifyContent:'flex-start', alignItems: 'center', padding: 5}}>
                                <Text>:  {msg.author}</Text>
                                <Text style={{margin : 5, backgroundColor: 'lightgrey', padding : 10, borderRadius: 10}}>{msg.message}</Text>
                            </View>
                        )
                    } else {
                        return (
                            <View key={index} style={{flexDirection: "row", justifyContent:'flex-start', alignItems: 'center', padding: 5}}>
                                <Text>{msg.author}  :</Text>
                                <Text style={{margin : 5, backgroundColor: 'lightgreen', padding : 10, borderRadius: 10}}>{msg.message}</Text>
                            </View>
                        )
                    }
                })
            }
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', position: 'absolute', padding: 10, width, bottom: 0}}>
                <TextInput onChangeText={(text) => {
                    setChatInput(text)
                }} placeholder="" value={chatInput} style={{borderColor : 'grey', borderWidth: 1, borderRadius: 5, margin: 10, width: width/1.2, height: height/15}}/>
                <Button title=">" onPress={async () => {
                    await props.sendChat(chatInput, props.loggedUser.username, params.partner.username)
                    props.navigation.navigate('chatRoom', {partner : params.partner})
                    setChatInput('')
                }}/>
            </View>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
