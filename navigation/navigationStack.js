import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Camera from '../src/camera';
import Test from '../test';
import cameraRoll from './cameraRollStack'
import Maps from '../src/maps';
import Form from '../src/userInput/formUser';
import Address from '../src/maps/getAddress';
import Success from '../component/success';
import History from '../src/history'

const navigationStack = createStackNavigator(
    {
        Test: {
            screen: Test,
        },
        Camera: {
            screen: Camera
        },
        CameraRoll: {
            screen: cameraRoll
        },
        Maps: {
            screen: Maps
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