import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Test from '../test';
import cameraRoll from './cameraRollStack'
import Form from '../src/userInput/formUser';
import Address from '../src/maps/getAddress';
import Success from '../component/success';
import History from '../src/history'

const navigationStack = createStackNavigator(
    {
        Test: {
            screen: Test,
        },
        CameraRoll: {
            screen: cameraRoll
        },
        Form: {
            screen: Form
        },
        Address: {
            screen: Address
        },
        Success: {
            screen: Success
        },
        History: {
            screen: History
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
);

export default createAppContainer(navigationStack);