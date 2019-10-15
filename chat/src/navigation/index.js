import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../components/Home'
import ChatRoomScreen from '../components/ChatRoom'
import LandingPageScreen from '../components/LandingPage'

export default createAppContainer(createStackNavigator({
    LandingPage : {
        screen : LandingPageScreen,
        navigationOptions:{
            header:null
        }
    },
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
