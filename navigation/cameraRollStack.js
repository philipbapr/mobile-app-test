import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CameraRoll from '../src/cameraRoll';

const cameraRollStack = createStackNavigator(
    {
        openCameraRoll: {
            screen: CameraRoll
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
)

export default cameraRollStack