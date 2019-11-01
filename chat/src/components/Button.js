import React from 'react'
import { Button } from 'react-native'

const ButtonComponent = (props) => {
    const {buttonColor, buttonTitle, disabledButton, triggerFunction} = props.data
    return (
        <Button onPress={() => {
            triggerFunction()
        }} title={buttonTitle} color={buttonColor} disabled={disabledButton}/>
    )


}

export default ButtonComponent
