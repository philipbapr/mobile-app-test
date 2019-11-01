import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../containers/Home'
import ChatRoomScreen from '../containers/ChatRoom'
import LandingPageScreen from '../containers/LandingPage'

export default createAppContainer(createStackNavigator({
    // LandingPage : {
    //     screen : LandingPageScreen,
    //     navigationOptions:{
    //         header:null
    //     }
    // },
    Home : {
        screen : HomeScreen,
        navigationOptions:{
            header:null
        }
    },
    ChatRoom : {
        screen : ChatRoomScreen,
        navigationOptions : {
            headerTitle : ''
        }
    }
  }));
