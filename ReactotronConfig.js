import Reactotron from 'reactotron-react-native'

Reactotron
  .configure({port:9090, host:"20.1.31.109"}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!