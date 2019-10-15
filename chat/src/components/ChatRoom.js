import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = {

}

const ChatRoom = (props) => {
    const {params} = props.navigation.state

    const [conversation, setConversation] = useState(null)

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
    },[props.users])
    



    return (
        <View>
            {
                conversation &&
                conversation.map((msg, index) => {
                    if(msg.author === props.loggedUser.username){
                        return (
                            <Text key={index} style={{margin : 10, backgroundColor: 'lightgrey', padding : 5, textAlign : 'right', borderRadius: 10}}>{new Date(msg.date).toLocaleTimeString()}, {msg.message}</Text>
                        )
                    } else {
                        return (
                            <Text key={index} style={{margin : 10, backgroundColor: 'lightgreen', padding : 5, borderRadius: 10}}>{msg.message}, {new Date(msg.date).toLocaleTimeString()}</Text>
                        )
                    }
                })
            }

        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
