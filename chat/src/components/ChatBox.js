import React from 'react'
import { View, Text } from 'react-native'

const ChatBox = (props) => {
    const {styleParent, styleChild, name, message} = props.data
    return (
        <View style={styleParent}>
            <Text>{name}</Text>
            <Text style={styleChild}>{message}</Text>
        </View>
    )
}

export default ChatBox
