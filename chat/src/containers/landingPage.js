import React from 'react'
import { View, Text } from 'react-native'
import {connect} from 'react-redux'
import {
    loginUser
} from '../store/action'

let mapStateToProps = state => {
    return {
        ...state
    }
}

let mapDispatchToProps = {

}



const landingPage = (props) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(landingPage)
