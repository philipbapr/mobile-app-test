import React from 'react'
import { TextInput } from 'react-native'

const TextInputComponent = (props) => {
    
    const {value, style, placeholder, triggerFunction} = props.data

    return (
        <TextInput onChangeText={(text) => {
            triggerFunction(text)
        }} placeholder={placeholder} value={value} style={style}/>
    )
}

export default TextInputComponent
